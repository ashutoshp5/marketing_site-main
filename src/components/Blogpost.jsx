import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom'; // Import Link

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Blogpost = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Fetch blog posts from the backend API
  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs`)
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  const cardVariants = (direction) => ({
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
      transition: { duration: 1, ease: "easeInOut" }, // Slower disappearance
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.2 }, // Slower appearance with a small delay
    },
  });

  return (
    <>
      {/* Section Two */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-2 md:px-8 max-w-full md:max-w-[1310px] mx-auto items-stretch"
      >
        {/* First Column */}
        {blogPosts[0] &&
          (() => {
            const imageSrc0 =   blogPosts[0].uploadedImagePath?.startsWith('http')
    ? blogPosts[0].uploadedImagePath
    : blogPosts[0].imageUrl?.startsWith('http')
    ? blogPosts[0].imageUrl
    : null;
            return (
              <Link to={`/blogs/${blogPosts[0]._id}`}>
                <motion.div
                  className="border-2 border-teal-400 rounded-lg p-4 h-full flex flex-col justify-between"
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants("left")}
                >
                  {/* Header Section */}
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-2 flex">
                      {imageSrc0 && (
                        <img src={imageSrc0} alt="Icon" className="w-8 h-8 mr-2" />
                      )}
                      {blogPosts[0].category}
                    </div>
                    {imageSrc0 && (
                      <img
                        className="w-full h-60 object-contain rounded-md mb-4"
                        style={{ aspectRatio: "16/9" }}
                        src={imageSrc0}
                        alt="Article"
                      />
                    )}
                  </div>
  
                  {/* Footer Section */}
                  <div>
                    <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-4">
                      {new Date(blogPosts[0].date).toLocaleDateString()}, {blogPosts[0].author}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })()}
  
        {/* Second Column (2 Rows with no images) */}
        <div className="flex flex-col gap-4">
          {blogPosts[1] &&
            (() => {
              const imageSrc1 =   blogPosts[1].uploadedImagePath?.startsWith('http')
    ? blogPosts[1].uploadedImagePath
    : blogPosts[1].imageUrl?.startsWith('http')
    ? blogPosts[1].imageUrl
    : null;
              return (
                <Link to={`/blogs/${blogPosts[1]._id}`}>
                  <motion.div
                    className="border-2 border-teal-400 rounded-lg p-4 h-full flex flex-col justify-between"
                    initial="hidden"
                    animate={controls}
                    variants={cardVariants("top")}
                  >
                    {/* Header Section */}
                    <div>
                      <div className="text-xs text-gray-500 mb-2 flex font-bold">
                        {imageSrc1 && (
                          <img
                            src={imageSrc1}
                            alt="Icon"
                            className="w-8 h-8 mr-2"
                          />
                        )}
                        {blogPosts[1].category}
                      </div>
                    </div>
  
                    {/* Footer Section */}
                    <div>
                      <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold">
                        {blogPosts[1].title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-4 mb-2">
                        {new Date(blogPosts[1].date).toLocaleDateString()}, {blogPosts[1].author}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })()}
  
          {blogPosts[2] &&
            (() => {
              const imageSrc2 =   blogPosts[2].uploadedImagePath?.startsWith('http')
    ? blogPosts[2].uploadedImagePath
    : blogPosts[2].imageUrl?.startsWith('http')
    ? blogPosts[2].imageUrl
    : null;
              return (
                <Link to={`/blogs/${blogPosts[2]._id}`}>
                  <motion.div
                    className="border-2 border-teal-400 rounded-lg p-4 h-full flex flex-col justify-between"
                    initial="hidden"
                    animate={controls}
                    variants={cardVariants("bottom")}
                  >
                    {/* Header Section */}
                    <div>
                      <div className="text-xs text-gray-500 mb-2 flex font-bold">
                        {imageSrc2 && (
                          <img
                            src={imageSrc2}
                            alt="Icon"
                            className="w-8 h-8 mr-2"
                          />
                        )}
                        {blogPosts[2].category}
                      </div>
                    </div>
  
                    {/* Footer Section */}
                    <div>
                      <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold">
                        {blogPosts[2].title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-4 mb-2">
                        {new Date(blogPosts[2].date).toLocaleDateString()}, {blogPosts[2].author}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })()}
        </div>
  
        {/* Third Column (Same as First Column) */}
        {blogPosts[3] &&
          (() => {
            const imageSrc3 =   blogPosts[3].uploadedImagePath?.startsWith('http')
    ? blogPosts[3].uploadedImagePath
    : blogPosts[3].imageUrl?.startsWith('http')
    ? blogPosts[3].imageUrl
    : null;
            return (
              <Link to={`/blogs/${blogPosts[3]._id}`}>
                <motion.div
                  className="border-2 border-teal-400 rounded-lg p-4 h-full flex flex-col justify-between"
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants("right")}
                >
                  {/* Header Section */}
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-2 flex">
                      {imageSrc3 && (
                        <img src={imageSrc3} alt="Icon" className="w-8 h-8 mr-2" />
                      )}
                      {blogPosts[3].category}
                    </div>
                    {imageSrc3 && (
                      <img
                        className="w-full h-60 object-contain rounded-md mb-4"
                        style={{ aspectRatio: "16/9" }}
                        src={imageSrc3}
                        alt="Article"
                      />
                    )}
                  </div>
  
                  {/* Footer Section */}
                  <div>
                    <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold">
                      {blogPosts[3].title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-4">
                      {new Date(blogPosts[3].date).toLocaleDateString()}, {blogPosts[3].author}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })()}
      </div>
    </>
  );
  
};

export default Blogpost;
