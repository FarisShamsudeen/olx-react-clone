import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateAd = () => {
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
  const navigate = useNavigate();

  // 🔹 Validate single field dynamically
  const validateField = (name: string, value: string) => {
    let message = "";

    switch (name) {
      case "title":
        if (!value.trim()) message = "Title is required.";
        else if (value.length < 3) message = "Title must be at least 3 characters.";
        break;

      case "description":
        if (!value.trim()) message = "Description is required.";
        else if (value.length < 10)
          message = "Description must be at least 10 characters.";
        break;

      case "price":
        const price = Number(value);
        if (isNaN(price) || price <= 0)
          message = "Enter a valid positive price.";
        break;

      case "category":
        if (!value.trim()) message = "Category is required.";
        break;

      case "file":
        if (!file) message = "Please upload an image.";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  // 🔹 Handle text input changes with instant validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  // 🔹 Handle image file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, file: "Only image files are allowed." }));
        setFile(null);
        return;
      }

      // Validate file size (< 2MB)
      if (selectedFile.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: "Image must be under 2MB." }));
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: "" })); // remove error instantly
    }
  };

  // 🔹 Validate all fields before submit
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

    if (!file && !form.image) newErrors.file = "Please upload an image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Upload image to Cloudinary
  const uploadImage = async (): Promise<string | null> => {
    if (!file) return form.image || null;
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
      console.error("Image upload failed:", error);
      alert("Image upload failed!");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to post an ad!");
      return;
    }

    let imageUrl = form.image;
    if (file) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const payload = {
      ...form,
      image: imageUrl,
      price: Number(form.price),
      userId: user.uid,
    };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Ad posted successfully!");
        navigate("/");
      } else {
        alert("Failed to post ad");
      }
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-8 sm:py-12 px-4 sm:px-8">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-2xl p-6 sm:p-8 border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
            Post Your Ad
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* TITLE */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Title</label>
              <input
                name="title"
                placeholder="Enter a catchy title"
                value={form.title}
                onChange={handleChange}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-full text-sm sm:text-base outline-none"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Describe your item..."
                value={form.description}
                onChange={handleChange}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-full h-24 sm:h-28 resize-none text-sm sm:text-base"
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* PRICE & CATEGORY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={handleChange}
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-full text-sm sm:text-base outline-none"
                />
                {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700">Category</label>
                <input
                  name="category"
                  placeholder="e.g. Mobile, Bike, Furniture"
                  value={form.category}
                  onChange={handleChange}
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-full text-sm sm:text-base outline-none"
                />
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block font-semibold mb-1 text-gray-700">Upload Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-all cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="text-blue-600 cursor-pointer font-medium text-sm sm:text-base"
                >
                  {file ? "Change Image" : "Click to Upload"}
                </label>
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-36 h-36 sm:w-40 sm:h-40 object-cover mt-3 rounded-md border"
                  />
                )}
              </div>
              {errors.file && <p className="text-red-600 text-sm mt-1">{errors.file}</p>}
            </div>

            {/* SUBMIT */}
            <button
              disabled={uploading}
              className={`py-3 rounded-md text-white font-semibold text-base sm:text-lg transition-all ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {uploading ? "Uploading..." : "Post Ad"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateAd;

