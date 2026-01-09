import React, { useState } from "react";
import bookImage from "../assets/images/books.png";

const BlogSearchSection = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(query.trim());
  };

  return (
    <section className="bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-sm:gap-12 gap-48">

          {/* TEXT + SEARCH — FIRST ON MOBILE */}
          <div className="order-1 lg:order-1 w-full lg:w-1/2">

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Your Kidney Care
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-500 mt-1">
              Resource Library
            </h2>

            {/* Search */}
            <div className="mt-6 flex flex-col gap-4 max-w-md">
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  placeholder="Search here"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>

              <div className="flex justify-end max    -sm:justify-center">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-semibold rounded-md"
                >

                  SEARCH
                </button>
              </div>
            </div>
          </div>

          {/* IMAGE — LAST ON MOBILE */}
          <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
            <img
              src={bookImage}
              alt="Books"
              className="w-32 sm:w-32 lg:w-[360px] object-contain"
            />
          </div>

        </div>
      </div>
    </section>


  );
};

export default BlogSearchSection;
