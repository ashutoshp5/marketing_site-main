import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom'; // Import Link

const BlogCard = ({ post, direction }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Allow animation to trigger multiple times
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // Reset to hidden when out of view
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'top' ? -100 : direction === 'bottom' ? 100 : 0,
      transition: { duration: 1, ease: 'easeInOut' },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1, ease: 'easeOut', delay: 0.2 },
    },
  };

  const imageSrc =   post.uploadedImagePath?.startsWith('http')
    ? post.uploadedImagePath
    : post.imageUrl?.startsWith('http')
    ? post.imageUrl
    : null;

    return (
      <Link to={`/blogs/${post._id}`} className="block"> {/* Wrap the motion div in Link */}
        <motion.div
          ref={ref}
          className="border-2 border-teal-400 rounded-lg p-4 cursor-pointer h-full flex flex-col"
          initial="hidden"
          animate={controls}
          variants={cardVariants}
        >
          {/* Header Section */}
          <div className="flex flex-col flex-grow">
            {/* Category and Icon */}
            <div className="text-xs font-bold text-gray-500 mb-2 flex items-center">
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={`${post.category} Icon`}
                  className="w-8 h-8 mr-2"
                />
              )}
              {post.category}
            </div>
    
            {/* Image Section */}
            <div className="w-full h-60 mb-4">
              {imageSrc ? (
                <img
                  className="w-full h-60 object-contain rounded-md mb-4"
                  style={{ aspectRatio: "16/9" }}
                  src={imageSrc}
                  alt={post.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/path-to-placeholder-image.png'; // Replace with your placeholder image path
                  }}
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
          </div>
    
          {/* Footer Section */}
          <div>
            <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}, {post.author}
            </p>
          </div>
        </motion.div>
      </Link>
    );
    
    
};

export default BlogCard;
