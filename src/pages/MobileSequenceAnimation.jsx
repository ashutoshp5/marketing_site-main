import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hook to track window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const MobileSequenceAnimation = () => {
  const sections = [
    {
      id: 0,
      image: "/1.png",
      text: {
        big: "Treatment Adherence",
        small: "We help you stay on track with your medications and lifestyle changes.",
        line3: "Making it easier to follow your treatment plan.",
        color: "text-red-500",
      },
    },
    {
      id: 1,
      image: "/mobile3img.png",
      text: {
        big: "Patient Monitoring & Data Analysis",
        small: "Continuous monitoring, real-time updates, and analytical tools keep you informed.",
        line3: "Providing timely interventions and better management.",
        color: "text-red-500",
      },
    },
    {
      id: 2,
      image: "/mobile2img.png",
      text: {
        big: "Disease Progression Prediction",
        small: "Our tools predict disease progression, providing timely interventions and better management.",
        line3: "Using AI analytics, we also identify high-risk patients for CKD.",
        color: "text-red-500",
      },
    },
  ];

  const [activeSection, setActiveSection] = useState(0);
  const isAnimating = useRef(false);
  const { width } = useWindowSize();

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  // References and Intersection Observer logic remain the same...
  const containerRef = useRef(null);
  const componentRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.8, // 80% visibility
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  // Scrolling and touch event handlers remain the same...
  useEffect(() => {
    if (containerRef.current) {
      const targetSection = containerRef.current.querySelector(
        `section[data-index="${activeSection}"]`
      );
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [activeSection]);

  const handleScroll = (direction) => {
    if (isAnimating.current) return;

    if (direction === "down" && activeSection < sections.length - 1) {
      setActiveSection((prev) => prev + 1);
      isAnimating.current = true;
    } else if (direction === "up" && activeSection > 0) {
      setActiveSection((prev) => prev - 1);
      isAnimating.current = true;
    } else {
      // At boundaries, allow default scrolling
      return;
    }

    setTimeout(() => {
      isAnimating.current = false;
    }, 1200); // Duration matches animation
  };

  const handleWheel = (event) => {
    if (!isInView) return; // Only handle scroll if component is in view

    const deltaY = event.deltaY;

    if (
      (deltaY > 0 && activeSection < sections.length - 1) ||
      (deltaY < 0 && activeSection > 0)
    ) {
      event.preventDefault(); // Prevent default scrolling only if we are handling the scroll
      if (deltaY > 0) {
        handleScroll("down");
      } else if (deltaY < 0) {
        handleScroll("up");
      }
    }
    // Else, allow default scrolling to proceed to other page sections
  };

  // Handle touch events for mobile devices
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (event) => {
    if (!isInView) return;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (!isInView) return;
    touchEndY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isInView) return;
    const deltaY = touchStartY.current - touchEndY.current;
    if (deltaY > 50 && activeSection < sections.length - 1) {
      handleScroll("down");
    } else if (deltaY < -50 && activeSection > 0) {
      handleScroll("up");
    }
    // Else, allow default scrolling to proceed
  };

  // Add event listeners for scroll and touch events only when component is in view
  useEffect(() => {
    if (isInView) {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: false });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: false });
    } else {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isInView, activeSection]);

  // Function to navigate to a specific section via navigation dots
  const scrollToSection = (index) => {
    if (isAnimating.current || index === activeSection) return;

    setActiveSection(index);
    isAnimating.current = true;

    setTimeout(() => {
      isAnimating.current = false;
    }, 1200); // Duration should match the scroll animation duration
  };

  // Function to calculate translation based on device type
  const calculateTranslateX = (index) => {
    if (isDesktop) {
      if (index === 0) return "-70%";
      if (index === 1) return "0%";
      if (index === 2) return "70%";
    } else if (isTablet) {
      if (index === 0) return "-50%";
      if (index === 1) return "0%";
      if (index === 2) return "50%";
    } else {
      if (index === 0) return "-40%";
      if (index === 1) return "0%";
      if (index === 2) return "40%";
    }
    return "0%";
  };

  // Variants for image animations
  const imageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  // Variants for text animations
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Render functions for different device types
  const renderDesktop = () => (
    <div
      ref={componentRef}
      className="relative w-full h-screen overflow-hidden bg-white"
    >
      {/* Header Section: Title and Partnering Text */}
      <div className="absolute top-16 left-0 right-0 flex flex-row items-center justify-between px-12 py-8 z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <h1 className="text-4xl font-bold text-black">
          Your <span className="text-cyan-500">CKD Partner</span>
        </h1>
        <p className="max-w-md text-base text-gray-700 md:text-right leading-relaxed">
          We are partnering with all kidney care stakeholders to create an
          ecosystem where the patient gets everything under one roof.
        </p>
      </div>

      {/* Scrollable Sections */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex flex-col overflow-hidden"
      >
        <AnimatePresence initial={false}>
          {sections.map(
            (section, index) =>
              activeSection === index && (
                <motion.section
                  key={section.id}
                  data-index={index}
                  className="min-h-screen flex items-center justify-center px-12 py-16"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <div className="w-full flex flex-row items-center justify-between">
                    {/* Content based on section index */}
                    {index === 0 && (
                      <motion.div
                        className="w-1/2 text-left p-5 max-w-lg mr-auto"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      >
                        <h2 className="text-5xl font-bold text-black leading-snug">
                          Treatment{" "}
                          <span className={section.text.color}>
                            Adherence
                          </span>
                        </h2>
                        <p className="text-lg mt-6 text-gray-600 leading-relaxed">
                          {section.text.small}
                        </p>
                        <p className="text-lg mt-4 text-gray-600 leading-relaxed">
                          {section.text.line3}
                        </p>
                      </motion.div>
                    )}

                    {index === 1 && (
                      <>
                        <motion.div
                          className="w-1/3 text-left max-w-md p-5 m-auto"
                          variants={textVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                          <h2 className="text-5xl font-bold text-black leading-snug">
                            {section.text.big
                              .split(" ")
                              .slice(0, -1)
                              .join(" ")}{" "}
                            <span className={section.text.color}>
                              {section.text.big.split(" ").slice(-1)}
                            </span>
                          </h2>
                          <p className="text-lg mt-4 text-gray-600 leading-relaxed">
                            {section.text.small}
                          </p>
                        </motion.div>

                        <motion.div
                          className="w-1/3 text-left md:text-right max-w-md m-auto"
                          variants={textVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                        >
                          <p className="text-lg mt-4 text-gray-600 leading-relaxed">
                            {section.text.line3}
                          </p>
                        </motion.div>
                      </>
                    )}

                    {index === 2 && (
                      <motion.div
                        className="w-1/2 text-left max-w-md ml-auto"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      >
                        <h2 className="text-5xl font-bold text-black leading-snug">
                          Disease <br />
                          <span className={section.text.color}>
                            Progression Prediction
                          </span>
                        </h2>
                        <p className="text-lg mt-4 text-gray-600 leading-relaxed">
                          {section.text.small}
                        </p>
                        <p className="text-lg mt-3 text-gray-600 leading-relaxed">
                          {section.text.line3}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.section>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Frame - Centered and smoothly shifting */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none p-4">
        <motion.div
          animate={{ x: calculateTranslateX(activeSection) }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="relative aspect-[9/19] w-60"
        >
          <img
            src="/mobile frame.png"
            className="absolute inset-0 rounded-2xl object-contain z-10 w-full h-full"
            alt="Mobile frame"
          />
          <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={sections[activeSection].id}
                src={sections[activeSection].image}
                alt={`Mobile Screen ${activeSection + 1}`}
                className="object-contain w-4/5 h-auto mt-4"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-30 flex flex-col space-y-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-5 h-5 rounded-full border-2 border-gray-400 ${
              activeSection === index
                ? "bg-red-500 border-red-500"
                : "bg-transparent hover:bg-red-400"
            } transition-colors`}
            aria-label={`Go to section ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );

  const renderTablet = () => (
    <div
      ref={componentRef}
      className="relative w-full h-screen overflow-hidden bg-white"
    >
      {/* Header Section: Title and Partnering Text */}
      <div className="absolute top-16 left-0 right-0 flex flex-col items-start justify-between px-8 py-8 z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-black">
          Your <span className="text-cyan-500">CKD Partner</span>
        </h1>
        <p className="max-w-md text-sm text-gray-700 mt-4 md:text-right leading-relaxed">
          We are partnering with all kidney care stakeholders to create an
          ecosystem where the patient gets everything under one roof.
        </p>
      </div>

      {/* Scrollable Sections */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex flex-col overflow-hidden"
      >
        <AnimatePresence initial={false}>
          {sections.map(
            (section, index) =>
              activeSection === index && (
                <motion.section
                  key={section.id}
                  data-index={index}
                  className="min-h-screen flex items-center justify-center px-8 py-16"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <div className="w-full flex flex-row items-center justify-between space-x-8">
                    {/* Content based on section index */}
                    {index === 0 && (
                      <motion.div
                        className="w-1/2 text-left p-5 max-w-lg ml-auto"
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      >
                        <h2 className="text-4xl font-bold text-black leading-snug">
                          Treatment{" "}
                          <span className={section.text.color}>
                            Adherence
                          </span>
                        </h2>
                        <p className="text-base mt-6 text-gray-600 leading-relaxed">
                          {section.text.small}
                        </p>
                        <p className="text-base mt-4 text-gray-600 leading-relaxed">
                          {section.text.line3}
                        </p>
                      </motion.div>
                    )}

                    {index === 1 && (
                      <>
                        <motion.div
                          className="w-1/3 text-left max-w-md p-5"
                          variants={textVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                          <h2 className="text-4xl font-bold text-black leading-snug">
                            {section.text.big
                              .split(" ")
                              .slice(0, -1)
                              .join(" ")}{" "}
                            <span className={section.text.color}>
                              {section.text.big.split(" ").slice(-1)}
                            </span>
                          </h2>
                          <p className="text-base mt-4 text-gray-600 leading-relaxed">
                            {section.text.small}
                          </p>
                        </motion.div>

                        <motion.div
                          className="w-1/3 text-left md:text-right max-w-md"
                          variants={textVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                        >
                          <p className="text-base mt-4 text-gray-600 leading-relaxed">
                            {section.text.line3}
                          </p>
                        </motion.div>
                      </>
                    )}

                    {index === 2 && (
                      <motion.div
                        className="w-1/2 text-left max-w-md mr-auto "
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      >
                        <h2 className="text-4xl font-bold text-black leading-snug">
                          Disease <br />
                          <span className={section.text.color}>
                            Progression Prediction
                          </span>
                        </h2>
                        <p className="text-base mt-4 text-gray-600 leading-relaxed">
                          {section.text.small}
                        </p>
                        <p className="text-base mt-3 text-gray-600 leading-relaxed">
                          {section.text.line3}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.section>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Frame - Centered with additional spacing */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none p-4">
        <motion.div
          animate={{ x: calculateTranslateX(activeSection) }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="relative aspect-[9/19] w-48 md:w-60"
        >
          <img
            src="/mobile frame.png"
            className="absolute inset-0 rounded-2xl object-contain z-10 w-full h-full"
            alt="Mobile frame"
          />
          <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={sections[activeSection].id}
                src={sections[activeSection].image}
                alt={`Mobile Screen ${activeSection + 1}`}
                className="object-contain w-4/5 h-auto mt-4"
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-30 flex flex-col space-y-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-5 h-5 rounded-full border-2 border-gray-400 ${
              activeSection === index
                ? "bg-red-500 border-red-500"
                : "bg-transparent hover:bg-red-400"
            } transition-colors`}
            aria-label={`Go to section ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );

  const renderMobile = () => (
    <div
      ref={componentRef}
      className="relative w-full min-h-screen overflow-hidden bg-white flex flex-col"
    >
      {/* Header Section: Title and Partnering Text */}
      <div className="flex flex-col items-center justify-center px-6 py-6 z-20 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl font-bold text-black text-center">
          Your <span className="text-cyan-500">CKD Partner</span>
        </h1>
        <p className="max-w-xs text-sm text-gray-700 mt-4 text-center leading-relaxed">
          We are partnering with all kidney care stakeholders to create an
          ecosystem where the patient gets everything under one roof.
        </p>
      </div>
  
      {/* Scrollable Sections */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col items-center justify-center overflow-hidden px-4 py-8"
      >
        <AnimatePresence mode="wait">
          {sections.map(
            (section, index) =>
              activeSection === index && (
                <motion.section
                  key={section.id}
                  data-index={index}
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {/* Mobile Frame Image */}
                  <div className="relative aspect-[9/19] w-32 mb-6">
                    {/* Static Mobile Frame */}
                    <img
                      src="/mobile frame.png"
                      className="absolute inset-0 rounded-2xl object-contain z-10 w-full h-full"
                      alt="Mobile frame"
                    />
                    {/* Dynamic Image Inside the Frame */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={section.id}
                          src={section.image}
                          alt={`Mobile Screen ${index + 1}`}
                          className="object-contain w-3/5 h-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                      </AnimatePresence>
                    </div>
                  </div>
  
                  {/* Text Content */}
                  <motion.div
                    className="text-center p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <h2 className="text-xl font-bold text-black leading-snug">
                      {section.text.big}
                    </h2>
                    <p className="text-sm mt-4 text-gray-600 leading-relaxed">
                      {section.text.small}
                    </p>
                    <p className="text-sm mt-3 text-gray-600 leading-relaxed">
                      {section.text.line3}
                    </p>
                  </motion.div>
                </motion.section>
              )
          )}
        </AnimatePresence>
      </div>
  
      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full border-2 border-gray-400 ${
              activeSection === index
                ? "bg-red-500 border-red-500"
                : "bg-transparent hover:bg-red-400"
            } transition-colors`}
            aria-label={`Go to section ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
  

  // Main render logic
  if (isDesktop) {
    return renderDesktop();
  } else if (isTablet) {
    return renderTablet();
  } else {
    return renderMobile();
  }
};

export default MobileSequenceAnimation;
