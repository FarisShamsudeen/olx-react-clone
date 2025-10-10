import { useState } from "react";
import arrow from "../assets/arrow.png";

const Menubar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const categories = [
    "Cars",
    "Motorcycles",
    "Mobile Phones",
    "For Sale: Houses & Apartments",
    "Scooters",
    "Commercial & Other Vehicles",
    "For Rent: Houses & Apartments",
  ];

  return (
    <div className="w-full bg-white shadow-sm border-t border-b border-gray-200">
      {/* 🔹 Top Row */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2">
        {/* Left: All Categories */}
        <div
          onClick={() => setShowCategories(!showCategories)}
          className="flex items-center gap-1 cursor-pointer select-none"
        >
          <p className="font-bold text-sm sm:text-base">ALL CATEGORIES</p>
          <img
            src={arrow}
            alt="Toggle"
            className={`w-5 h-5 transform transition-transform ${showCategories ? "rotate-180" : "rotate-0"
              }`}
          />
        </div>

        {/* 🔹 Desktop Categories */}
        <div className="hidden sm:flex items-center justify-center gap-5 py-2 text-[13px] text-gray-700 font-medium">
          {categories.map((cat) => (
            <h1 key={cat} className="hover:text-blue-600 cursor-pointer whitespace-nowrap">
              {cat}
            </h1>
          ))}
        </div>

        {/* Right: Date */}
        <div className="hidden sm:block border-l pl-3 text-gray-500 text-sm">
          <p>{today}</p>
        </div>
      </div>

      {/* 🔹 Mobile Scrollable Menu */}
      <div className="sm:hidden overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-4 px-4 py-2 text-sm font-medium text-gray-700">
          {categories.map((cat) => (
            <span
              key={cat}
              className="whitespace-nowrap hover:text-blue-600 cursor-pointer flex-shrink-0"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* 🔹 Dropdown for "All Categories" */}
      {showCategories && (
        <div className="absolute bg-white w-full left-0 border-t border-gray-200 shadow-md z-40">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-4 text-sm">
            {categories.map((cat) => (
              <p
                key={cat}
                className="hover:text-blue-600 cursor-pointer border-b pb-1 border-transparent hover:border-blue-600 transition-all"
              >
                {cat}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menubar;

