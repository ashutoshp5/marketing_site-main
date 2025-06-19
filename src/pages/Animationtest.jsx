import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SequenceAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollRef = useRef(null);
  const isScrolling = useRef(false);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const sequences = [
    {
      text: {
        line1: "Take advantage of",
        line2: "real-world insights & evidence",
        color: "red-500",
      },
      image: "/1st.png",
    },
    {
      text: {
        line1: "Take advantage of",
        line2: "real-world insights & evidence",
        color: "red-500",
      },
      image: "/2n.png",
    },
    {
      text: {
        line1: "Real-time escalation pathways and",
        line2: "alert messages for enhanced decision making",
        color: "red-500",
      },
      image: "/3rd.png",
    },
    {
      text: {
        line1: "Enable personalized, just-in-time",
        line2: "interventions",
        color: "red-500",
      },
      image: "/4th.png",
    },
    {
      text: {
        line1: "Secure, important conversations between patients and",
        line2: "healthcare teams all in one place",
        color: "red-500",
      },
      image: "/5th.png",
    },
    {
      text: {
        line1: "Enhanced decision making powered by",
        line2: "AI/ML & analytics",
        color: "red-500",
      },
      image: "/6th.png",
    },
  ];

  useEffect(() => {
    const SCROLL_THRESHOLD = 100;
    const SCROLL_TIMEOUT = 200;
    const ANIMATION_COOLDOWN = 1000;

    const handleWheel = (e) => {
      e.preventDefault();

      const currentTime = Date.now();
      const timeSinceLastScroll = currentTime - lastScrollTime.current;

      if (timeSinceLastScroll > SCROLL_TIMEOUT) {
        scrollAccumulator.current = 0;
      }

      scrollAccumulator.current += Math.abs(e.deltaY);
      lastScrollTime.current = currentTime;

      if (scrollAccumulator.current > SCROLL_THRESHOLD && !isScrolling.current) {
        const newDirection = e.deltaY > 0 ? 1 : -1;
        const nextIndex = currentIndex + newDirection;

        if (nextIndex >= 0 && nextIndex < sequences.length) {
          isScrolling.current = true;
          setDirection(newDirection);
          setCurrentIndex(nextIndex);
          scrollAccumulator.current = 0;

          setTimeout(() => {
            isScrolling.current = false;
          }, ANIMATION_COOLDOWN);
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const deltaX = touchStartX.current - touchEndX.current;

      if (Math.abs(deltaX) > 50 && !isScrolling.current) {
        const newDirection = deltaX > 0 ? 1 : -1; // Swipe left is next, swipe right is previous
        const nextIndex = currentIndex + newDirection;

        if (nextIndex >= 0 && nextIndex < sequences.length) {
          isScrolling.current = true;
          setDirection(newDirection);
          setCurrentIndex(nextIndex);

          setTimeout(() => {
            isScrolling.current = false;
          }, ANIMATION_COOLDOWN);
        }
      }
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false });
      element.addEventListener("touchstart", handleTouchStart, { passive: false });
      element.addEventListener("touchmove", handleTouchMove, { passive: false });
      element.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentIndex, sequences.length]);

  const handleNavClick = (index) => {
    if (!isScrolling.current && index !== currentIndex) {
      isScrolling.current = true;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  const imageVariants = {
    enter: (direction) => ({
      y: direction > 0 ? 45 : -60,
      opacity: 0.5,
      scale: 1,

    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: "spring", stiffness: 100, damping: 9, duration: 2 },
        opacity: { duration: 0 },
        scroll: { duration: 1 },
      },
    },
    exit: (direction) => ({
      y: direction > 0 ? -100 : 60,
      opacity: 0,
      scale: 0.95,
      transition: {
        y: { type: "spring", stiffness: 100, damping: 20, duration: 2 },
        opacity: { duration: 0.5 },
        scroll: { duration: 1 },
      },
    }),
  };
  

  const textVariants = {
    enter: (direction) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 1,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 100, damping: 9, duration: 2 },
        scroll: { duration: 2 },
      },
    },
    exit: (direction) => ({
      y: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: {
        y: { type: "spring", stiffness: 100, damping: 20, duration: 2 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <div
      ref={scrollRef}
      className="relative flex items-center justify-center bg-white overflow-hidden mt-16 mb-16 md:mt-24 md:mb-24 px-4"
    >
      {/* Right side navigation */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20 hidden md:flex">
        {sequences.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleNavClick(index)}
            className="group relative flex items-center"
            whileHover="hover"
          >
            <motion.div
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-red-500"
                  : "bg-gray-300 group-hover:bg-gray-400"
              }`}
            />
            <motion.span
              className="absolute left-6 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              variants={{
                hover: { opacity: 1, x: 0 },
              }}
            >
              {`Section ${index + 1}`}
            </motion.span>
          </motion.button>
        ))}
      </div>

      <div className="relative max-w-[90%] w-full md:w-[1200px] mx-auto">
        <div className="flex gap-8 md:gap-12 items-center flex-col md:flex-row">
          {/* Left side - Images */}
          <div className="relative w-full md:w-1/2 aspect-[1.11]">
            <img
              src="/desktopframe.png"
              className="absolute inset-0 rounded-lg object-contain z-10 w-full h-full"
              alt="Desktop frame"
            />
            <div className="absolute inset-0 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 rounded-lg p-2 sm:p-4">
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <img
                    src={sequences[currentIndex].image}
                    alt={`Sequence ${currentIndex + 1}`}
                    className="object-contain w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Text */}
          <div className="relative w-full md:w-[45%] min-h-[200px] flex items-center">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="space-y-3 text-center md:text-left mb-20">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                    <span className="font-semibold block mb-[3px]">
                      {sequences[currentIndex].text.line1}
                    </span>
                    <span
                      className={`font-semibold text-${sequences[currentIndex].text.color}`}
                    >
                      {sequences[currentIndex].text.line2}
                    </span>
                  </h2>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom navigation for mobile */}
        <div className="flex md:hidden justify-center mt-8 gap-2">
          {sequences.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-red-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SequenceAnimation;
