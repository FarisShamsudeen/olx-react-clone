import { useEffect, useState } from "react";
import { auth } from "../firebase/setup";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MyAds = () => {
  const [myAds, setMyAds] = useState<any[]>([]);
  const [editingAd, setEditingAd] = useState<any | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 🔹 Fetch user's ads
  const fetchMyAds = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const res = await fetch(`http://localhost:5000/api/products/user/${user.uid}`);
    const data = await res.json();
    setMyAds(data);
  };

  useEffect(() => {
    fetchMyAds();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    fetchMyAds();
  };

  const handleEdit = (ad: any) => {
    setEditingAd(ad);
    setForm({
      title: ad.title,
      description: ad.description,
      price: ad.price,
      category: ad.category,
      image: ad.image,
    });
    setFile(null);
    setErrors({});
  };

  // 🔹 Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    else if (form.title.length < 3) newErrors.title = "Title must be at least 3 characters.";

    if (!form.description.trim()) newErrors.description = "Description is required.";
    else if (form.description.length < 10)
      newErrors.description = "Description must be at least 10 characters.";

    const price = Number(form.price);
    if (isNaN(price) || price <= 0) newErrors.price = "Enter a valid positive price.";

    if (!form.category.trim()) newErrors.category = "Category is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!file) return form.image;
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "olx_clone");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dytrepnlj/image/upload",
        data
      );

      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed!");
      return form.image;
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    let imageUrl = form.image;
    if (file) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const updatedData = { ...form, image: imageUrl };

    const res = await fetch(`http://localhost:5000/api/products/${editingAd._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      alert("Ad updated successfully!");
      setEditingAd(null);
      fetchMyAds();
    } else {
      alert("Failed to update ad");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow p-4 sm:p-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
          My Ads
        </h1>

        {myAds.length === 0 ? (
          <p className="text-gray-600 text-center mt-20 text-lg">
            You haven’t posted any ads yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myAds.map((item) => (
              <div
                key={item._id}
                className="group relative bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-56 sm:h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate">{item.title}</h2>
                  <p className="text-blue-600 font-bold text-xl mt-1">
                    ₹ {item.price}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                </div>

                <div className="absolute inset-0 bg-black/75 bg-opacity-40 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {editingAd && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3 sm:p-6">
          <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl p-6 relative flex flex-col sm:flex-row gap-6 transition-all duration-300">
            {/* Left Side: Image & Upload */}
            <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 pr-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Product Image</h3>

              <div className="w-full flex flex-col items-center">
                {(file || form.image) ? (
                  <img
                    src={file ? URL.createObjectURL(file) : form.image}
                    alt="Preview"
                    className="w-56 h-56 object-cover rounded-md border shadow-sm"
                  />
                ) : (
                  <div className="w-56 h-56 bg-gray-100 flex items-center justify-center rounded-md border border-dashed text-gray-400 text-sm">
                    No Image Selected
                  </div>
                )}

                <label className="block mt-4 w-full text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <span className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-md border border-blue-300 text-sm">
                    Change Image
                  </span>
                </label>
              </div>
            </div>

            {/* Right Side: Form Fields */}
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center sm:text-left">
                Edit Your Ad
              </h2>

              <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                {/* Title */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 w-full h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Price (₹)
                    </label>
                    <input
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      type="number"
                      className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.price && (
                      <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Category
                    </label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.category && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setEditingAd(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`px-4 py-2 rounded-md text-white font-semibold ${uploading
                        ? "bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {uploading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyAds;

