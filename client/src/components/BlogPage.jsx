// BlogPage.jsx
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getApiBaseUrl } from "../lib/apiBase";

const BlogPage = ({ searchQuery = "" }) => {
  // State to hold blog posts and pagination
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from backend
  useEffect(() => {
    const API_BASE_URL = getApiBaseUrl();
    if (!API_BASE_URL) {
      setLoading(false);
      return;
    }

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

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const normalizedQuery = (searchQuery || "").trim().toLowerCase();
  const filteredPosts = normalizedQuery
    ? blogPosts.filter((post) => {
        const title = (post.title || "").toString().toLowerCase();
        const category = (post.category || "").toString().toLowerCase();
        const author = (post.author || "").toString().toLowerCase();
        return (
          title.includes(normalizedQuery) ||
          category.includes(normalizedQuery) ||
          author.includes(normalizedQuery)
        );
      })
    : blogPosts;

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="mb-12">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
          Blog Section
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Stay updated with the latest insights, news, and expert advice on kidney health and healthcare innovation.
        </p>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          <span className="ml-3 text-gray-600">Loading articles...</span>
        </div>
      ) : (
        <>
          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => {
                return (
                  <BlogCard key={post._id} post={post} />
                );
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                <p className="text-gray-500">Check back soon for new content!</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`
                flex items-center justify-center 
                w-12 h-12 
                rounded-full 
                border-2 
                transition-all 
                duration-300 
                ${
                  currentPage === 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                    : "border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white hover:shadow-lg"
                }
              `}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center space-x-2">
              <div className="bg-teal-50 border border-teal-200 rounded-full px-5 py-2">
                <span className="text-teal-700 font-semibold text-sm">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`
                flex items-center justify-center 
                w-12 h-12 
                rounded-full 
                border-2 
                transition-all 
                duration-300 
                ${
                  currentPage === totalPages
                    ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                    : "border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white hover:shadow-lg"
                }
              `}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default BlogPage;
