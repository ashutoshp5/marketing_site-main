import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import phoneImage from '../assets/figma images/kidneyphonecare 1(2x).png'; // Replace with your image path

const KidneyCareSection = () => {
  // Setup for scroll-triggered animation
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger every time the section comes into view
    threshold: 0.3, // The percentage of the section that needs to be visible before triggering
  });

  // Use effect to start animation based on inView
  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  // Animation Variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const floatingVariants = {
    floating: {
      y: [0, -20, 0], // Floating effect
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref} // Reference for scroll triggering
      className="flex flex-col md:flex-row items-center justify-center p-4 md:p-8 lg:px-16 bg-white"
      initial="hidden"
      animate={controls} // Use animation control based on scroll position
      variants={textVariants}
    >
      {/* Text Section */}
      <motion.div
        className="text-center md:text-left  mb-8 md:mb-0 md:w-1/2 lg:-mt-80 mt-20 order-1 md:order-1"
        variants={textVariants}
      >
        <h1 className="text-4xl mt-4 md:text-5xl lg:text-6xl font-bold text-black">Your Kidney Care</h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-500">
          On Your <br />
          Fingertips
        </h2>
        <p className="mt-4 text-gray-600 text-sm md:text-base lg:text-lg">
          Delivering all kidney care <br />
          stakeholders in your health <br />
          journey under one roof
        </p>
        <button className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">
          Learn More
        </button>
      </motion.div>

      {/* Image Section with Floating Effect */}
      <motion.div
        className="md:w-1/2 lg:w-1/3 flex justify-center mt-10 md:mt-0 order-2 md:order-2"
        variants={floatingVariants}
        initial="hidden"
        animate={inView ? 'floating' : 'hidden'} // Trigger floating effect when in view
      >
        <img
          src={phoneImage}
          alt="Kidney Care"
          className="w-max h-auto lg:mr-20 lg:my-10 transform rotate-12"
        />
      </motion.div>
    </motion.div>
  );
};

export default KidneyCareSection;
