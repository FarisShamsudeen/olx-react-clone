import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Details = () => {
  const location = useLocation();
  const data = location?.state?.data;

  if (!data) return <p className="text-center mt-20 text-gray-500">No product data found.</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-6 sm:py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="w-full h-64 sm:h-80 md:h-[400px] flex items-center justify-center bg-gray-50 border-b">
              <img
                src={data?.image}
                alt={data?.title}
                className="max-h-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-semibold mb-2">{data?.title}</h1>
              <p className="text-gray-600 text-sm mb-3">{data?.category}</p>
              <hr className="mb-4" />

              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {data?.description}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col gap-4 h-fit lg:sticky lg:top-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-5">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">₹ {data?.price}</h2>
              <p className="text-gray-600 text-sm mb-3">
                Posted on <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </p>
              <hr className="my-3" />
              <p className="text-gray-700 text-sm sm:text-base">
                Category: <span className="font-medium">{data?.category}</span>
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-2">Seller Description</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700">
                  {data?.title?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">OLX User</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Member since 2025</p>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm sm:text-base">
                Chat with Seller
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-2">Posted in</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                📍 <span className="font-medium">Malappuram, Kerala</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Details;

