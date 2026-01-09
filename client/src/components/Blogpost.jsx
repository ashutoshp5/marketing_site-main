import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServerBaseUrl } from "../lib/apiBase";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80";

const BlogCard = ({ blog, showImage }) => {
  const apiUrl = getServerBaseUrl();
  const imageSrc = blog.uploadedImagePath
    ? `${apiUrl}${blog.uploadedImagePath}`
    : blog.imageUrl || DEFAULT_IMAGE;

  return (
    <Link to={`/blogs/${blog._id}`}>
      <div className="border hover:border-teal-400 rounded-lg p-4 h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
        {/* Header */}
        <div>
          <div className="text-xs font-bold text-gray-500 mb-2 flex items-center">
            <img
              src={imageSrc}
              alt="icon"
              className="w-8 h-8 mr-2 rounded-full object-cover"
              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
            />
            {blog.category}
          </div>

          {showImage && (
            <img
              src={imageSrc}
              alt="article"
              className="w-full h-60 object-cover rounded-md mb-4"
              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
            />
          )}
        </div>

        {/* Footer */}
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold">{blog.title}</h3>
          <p className="text-sm text-gray-500 mt-4">
            {new Date(blog.date).toLocaleDateString()}, {blog.author}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Blogpost = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const serverBase = getServerBaseUrl();
    if (!serverBase) {
      setLoading(false);
      return;
    }

    fetch(`${serverBase}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading blogs...</p>;
  }

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>No blogs available</p>
        <p className="text-sm text-gray-500">Check console for errors</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-2 md:px-8 max-w-[1310px] mx-auto items-stretch">
      {/* First Column */}
      {blogPosts[0] && <BlogCard blog={blogPosts[0]} showImage />}

      {/* Second Column */}
      <div className="flex flex-col gap-4">
        {blogPosts[1] && <BlogCard blog={blogPosts[1]} />}
        {blogPosts[2] && <BlogCard blog={blogPosts[2]} />}
      </div>

      {/* Third Column */}
      {blogPosts[3] && <BlogCard blog={blogPosts[3]} showImage />}
    </div>
  );
};

export default Blogpost;
