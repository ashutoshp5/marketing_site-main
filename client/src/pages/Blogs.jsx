import React, { useState } from "react";
import BlogPage from "../components/BlogPage";
import BlogSearchSection from "../components/BlogSearchSection";
import backgroundImage from "../assets/figma images/how.png";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div
        className="bg-gradient-to-b from-blue-50/90 to-blue-50/70  flex justify-center items-center overflow-x-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <BlogSearchSection onSearch={setSearchQuery} />
      </div>
      <BlogPage searchQuery={searchQuery} />
    </>
  );
};

export default Blogs;
