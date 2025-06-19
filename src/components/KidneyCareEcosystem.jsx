import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/animations/▶-Animation-frame.json"; 
import { useInView } from "react-intersection-observer";

const KidneyCareEcosystem = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const lottieRef = useRef(null);

  // Toggle for controlling fade-in on initial mount or replay
  const [fadeIn, setFadeIn] = useState(false);

  // On mount or whenever `inView` changes, handle animation logic
  useEffect(() => {
    if (inView) {
      // Fade in the container to hide potential jerk
      setFadeIn(true);

      // Reset to first frame and play once
      if (lottieRef.current) {
        lottieRef.current.goToAndStop(0, true);
        // Delay a tiny bit to ensure goToAndStop completes before playing
        setTimeout(() => {
          lottieRef.current.play();
        }, 50);
      }
    } else {
      // Hide to avoid seeing the paused or incomplete frame
      setFadeIn(false);

      // Optionally, you can stop the animation or reset to frame 0
      if (lottieRef.current) {
        lottieRef.current.goToAndStop(0, true);
      }
    }
  }, [inView]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-screen bg-gray-50 p-4 md:p-8">

      {/* Left Section - Heading at the top left */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/3 w-full lg:text-left text-center lg:pl-16 mb-8 lg:mb-0"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
          Kidney Care Ecosystem
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-400 mt-4">
          On Your Fingertips
        </h2>
      </motion.div>

      {/* Center Section - Lottie Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/3 w-full flex justify-center items-center mb-8 lg:mb-0"
      >
        <div ref={ref} className="relative">
          {/* Container for fade-in effect */}
          <div
            className={`transition-opacity duration-300 ${
              fadeIn ? "opacity-100" : "opacity-0"
            } 
            w-48 sm:w-56 md:w-64 lg:w-80
            h-[380px] sm:h-[420px] md:h-[480px] lg:h-[540px]
            overflow-hidden flex items-center justify-center`}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              autoplay={false}    // We manually control play
              loop={false}        // Play once
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              className="w-full h-full object-cover"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Right Section - Text at the bottom right */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/3 w-full lg:text-right text-center mt-8 lg:mt-[300px] px-4 lg:px-0"
      >
        <div className="text-teal-800">
          <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-4">
            A CKD (Stage 1 to Stage 4, dialysis & transplant) patient needs multiple services in their treatment journey.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg">
            We partner with all kidney care stakeholders to create an ecosystem where the patient gets everything under one roof.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default KidneyCareEcosystem;
