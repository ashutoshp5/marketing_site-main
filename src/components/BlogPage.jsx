// BlogPage.jsx
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const BlogPage = () => {
  // State to hold blog posts and pagination
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs`)
      .then((response) => response.json())
      .then((data) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      });
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Scroll to top when currentPage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <section className="bg-gray-50 py-20 px-4 md:px-16 max-w-full mx-auto">
      {/* Section Heading */}
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl px-6 md:px-10 mb-10 text-center md:text-left">
        Blog Section
      </h1>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-2 md:px-8 max-w-full md:max-w-[1310px] mx-auto">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => {
                // Decide direction based on some property of the post or randomly
                let direction;
                if (post.category === "News") {
                  direction = "top";
                } else if (post.category === "Report") {
                  direction = "bottom";
                } else {
                  direction = "left"; // Default direction
                }

                return (
                  <BlogCard key={post._id} post={post} direction={direction} />
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No blogs on this page.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`
          relative 
          flex items-center justify-center 
          w-14 h-14 
          border-2 
          rounded-full 
          overflow-hidden
          transition-all 
          duration-400 
          ease-in-out
          group
          ${
            currentPage === 1
              ? "border-gray-300 text-gray-300 cursor-not-allowed"
              : "border-teal-500 text-teal-500 hover:border-teal-600 hover:text-white"
          }
        `}
            >
              {/* Gradient hover effect */}
              <span
                className={`
            absolute 
            inset-0 
            bg-gradient-to-br 
            from-teal-500 
            to-teal-600 
            transform 
            scale-0 
            group-hover:scale-150 
            origin-center 
            transition-transform 
            duration-500 
            ease-out
            ${currentPage === 1 ? "hidden" : ""}
          `}
              ></span>

              <ChevronLeft
                size={28}
                className={`
            relative 
            z-10 
            transition-transform 
            duration-300 
            group-hover:scale-110
            ${currentPage === 1 ? "opacity-50" : ""}
          `}
              />
            </button>

            <div className="flex items-center space-x-2">
              <div className="bg-teal-100 rounded-full px-4 py-1">
                <span className="text-teal-700 font-bold">{currentPage}</span>
                <span className="text-gray-500 ml-1">/ {totalPages}</span>
              </div>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`
          relative 
          flex items-center justify-center 
          w-14 h-14 
          border-2 
          rounded-full 
          overflow-hidden
          transition-all 
          duration-400 
          ease-in-out
          group
          ${
            currentPage === totalPages
              ? "border-gray-300 text-gray-300 cursor-not-allowed"
              : "border-teal-500 text-teal-500 hover:border-teal-600 hover:text-white"
          }
        `}
            >
              {/* Gradient hover effect */}
              <span
                className={`
            absolute 
            inset-0 
            bg-gradient-to-br 
            from-teal-500 
            to-teal-600 
            transform 
            scale-0 
            group-hover:scale-150 
            origin-center 
            transition-transform 
            duration-500 
            ease-out
            ${currentPage === totalPages ? "hidden" : ""}
          `}
              ></span>

              <ChevronRight
                size={28}
                className={`
            relative 
            z-10 
            transition-transform 
            duration-300 
            group-hover:scale-110
            ${currentPage === totalPages ? "opacity-50" : ""}
          `}
              />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default BlogPage;
