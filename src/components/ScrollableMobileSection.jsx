import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import patientMob1 from '../assets/images/mob1.png';
import patientMob2 from '../assets/images/mob2.png';
import patientMob3 from '../assets/images/mob3.png';

const sections = [
  {
    image: patientMob1,
    title: "Patient Monitoring &",
    subtitle: "Data Analysis",
    subtitleColor: "text-teal-500",
    description: "Continuous monitoring, real-time updates & our analytical tools keep you and your healthcare team informed about your health status.",
  },
  {
    image: patientMob2,
    title: "Treatment Adherence",
    description: "We help you stay on track with your medications and lifestyle changes, making it easier to follow your treatment plan.",
    highlightWords: ["Adherence"],
  },
  {
    image: patientMob3,
    title: "Disease Progression Prediction",
    description: "Our tools predict disease progression, providing timely interventions and better management.",
    highlightWords: ["Progression", "Prediction"],
  },
];

const ScrollableMobileSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight } = containerRef.current;
        const newIndex = Math.round(scrollTop / clientHeight);
        if (newIndex !== activeIndex) {
          setDirection(newIndex > activeIndex ? 1 : -1);
          setActiveIndex(newIndex);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeIndex]);

  const contentVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const imageVariants = {
    enter: (direction) => ({
      y: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.5,
      rotate: direction > 0 ? -10 : 10,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction) => ({
      y: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.5,
      rotate: direction < 0 ? -10 : 10,
    }),
  };

  const transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-white to-gray-100">
      <motion.div 
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex flex-col space-y-4">
          {sections.map((_, index) => (
            <motion.span
              key={index}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index ? 'bg-teal-500' : 'bg-gray-300'
              }`}
              animate={{
                scale: activeIndex === index ? [1, 1.4, 1] : 1,
              }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
            />
          ))}
        </div>
      </motion.div>

      <div 
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className="h-screen flex justify-center items-center px-6 md:px-10 snap-start"
          >
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
              <AnimatePresence initial={false} custom={direction}>
                {activeIndex === index && (
                  <motion.div
                    className="md:w-1/2 mb-10 md:mb-0"
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                      {section.title.split(' ').map((word, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                          {section.highlightWords && section.highlightWords.includes(word) ? (
                            <span className="text-teal-500">{word} </span>
                          ) : (
                            word + ' '
                          )}
                        </motion.span>
                      ))}
                    </h2>
                    {section.subtitle && (
                      <motion.p 
                        className={`text-2xl sm:text-3xl md:text-4xl font-bold ${section.subtitleColor || ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {section.subtitle}
                      </motion.p>
                    )}
                    <motion.p
                      className="text-gray-700 text-lg leading-relaxed mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      {section.description}
                    </motion.p>
                    <motion.button
                      className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-full font-semibold shadow-lg hover:bg-teal-600 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      Learn More
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence initial={false} custom={direction}>
                {activeIndex === index && (
                  <motion.div
                    className="md:w-1/2 flex justify-center items-center"
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                  >
                    <motion.div
                      className="w-[60%] md:w-[50%] lg:w-[45%] aspect-[9/16] border-8  rounded-[2.5rem]  shadow-2xl overflow-hidden relative"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src={section.image}
                        alt={`Mobile display for ${section.title}`}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.2, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[5%] bg-black rounded-b-xl"></div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableMobileSection;