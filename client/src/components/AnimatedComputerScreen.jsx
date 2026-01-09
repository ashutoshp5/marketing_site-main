import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import doc1 from '../assets/images/doc1.png';
import doc2 from '../assets/images/doc2.png';
import doc3 from '../assets/images/doc3.png';
import doc4 from '../assets/images/doc4.png';
import doc5 from '../assets/images/doc5.jpg';

const sections = [
  {
    image: doc1,
    title: "Enhanced Decision Making Powered By",
    subtitle: "AI/ML & Analytics",
    subtitleColor: "text-orange-500",
  },
  {
    image: doc2,
    title: "Secure, Important Conversations",
    subtitle: "Between Patients And Healthcare Care Teams All At One Place",
    highlightWords: ["Important", "Conversations"],
  },
  {
    image: doc3,
    title: "Real-Time Escalation Pathways And Alert Messages For Enhanced Decision Making",
    highlightWords: ["Escalation", "Pathways", "Alert", "Messages"],
  },
  {
    image: doc4,
    title: "Enable Personalized, Just-In-Time Interventions",
    highlightWords: ["Personalized,"],
  },
  {
    image: doc5,
    title: "Take Advantage Of",
    subtitle: "Real-World Insights & Evidence",
    subtitleColor: "text-orange-500",
  },
];

const AnimatedComputerScreen = () => {
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
                activeIndex === index ? 'bg-orange-500' : 'bg-gray-300'
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
                            <span className="text-orange-500">{word} </span>
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
                    <motion.button
                      className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
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
                      className="w-full md:w-[550px] aspect-video border-8 border-gray-800 rounded-lg bg-white shadow-2xl overflow-hidden"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src={section.image}
                        alt={`Screen content for ${section.title}`}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.2, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                      />
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

export default AnimatedComputerScreen;