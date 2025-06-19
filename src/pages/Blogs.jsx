import React from "react";
import BlogPage from "../components/BlogPage";
import BlogSearchSection from "../components/BlogSearchSection";
import Footer from "../components/Footer";
import backgroundImage from "../assets/figma images/how.png";

const Blogs = () => {
  return (
    <>
      <div
        className="bg-gradient-to-b from-blue-50/90 to-blue-50/70  w-full flex justify-center items-center overflow-x-hidden py-20"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <BlogSearchSection />
      </div>
      <BlogPage />
      <Footer />
    </>
  );
};

export default Blogs;
