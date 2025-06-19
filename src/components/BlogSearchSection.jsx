import React from "react";
import bookImage from "../assets/images/books.png"; // Ensure this path is correct

const BlogSearchSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-blue-50 px-4 md:px-8 lg:px-32 py-20 md:py-16 lg:py-36 rounded-lg max-w-full mx-auto  gap-x-32">
      {/* Text and Search Section */}
      <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0 lg:mr-8 text-center lg:text-left w-full lg:w-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
          Your Kidney Care
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-500 mt-2">
          Resource Library
        </h2>
        {/* Search Bar */}
        <div className="relative mt-6 w-1/2 lg:w-[500px]">
          <input
            type="text"
            placeholder="Search topics"
            className="px-4 py-4 w-full rounded-lg border-2 border-gray-200 shadow-[0px_0px_30px_10px_rgba(0,72,128,0.4)]"
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-center lg:justify-start mt-4">
          <button
            className="bg-red-500 text-white px-8 py-4 w-full  rounded-lg hover:bg-red-600 transition-colors shadow-[0px_0px_30px_10px_rgba(0,72,128,0.4)]"
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex justify-center lg:justify-end items-center w-full lg:w-auto mt-8 lg:mt-0">
        <img
          src={bookImage}
          alt="Stack of books"
          className="md:w-full max-w-xs lg:max-w-[200px] h-auto mx-auto w-1/2"
        />
      </div>
    </div>
  );
};

export default BlogSearchSection;
