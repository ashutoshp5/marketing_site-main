import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const DoctorContact = () => {
  // Helper function to manage animations and in-view detection
  const useScrollAnimation = (threshold = 0.2) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold, triggerOnce: false });

    React.useEffect(() => {
      if (inView) {
        controls.start('visible');
      } else {
        controls.start('hidden'); // Reset the animation when out of view
      }
    }, [controls, inView]);

    return [ref, controls];
  };

  // Using the custom hook for each element
  const [refH2, controlsH2] = useScrollAnimation(0.2);
  const [refH1, controlsH1] = useScrollAnimation(0.2);
  const [refP, controlsP] = useScrollAnimation(0.2);
  const [refInput, controlsInput] = useScrollAnimation(0.2);
  const [refButton, controlsButton] = useScrollAnimation(0.2);

  // Animation variants for each element
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 text-center py-12 px-4 md:px-10 lg:px-20">
      {/* Heading 2 - Join Us On */}
      <motion.h2
        ref={refH2}
        className="text-2xl md:text-3xl lg:text-4xl font-bold"
        initial="hidden"
        animate={controlsH2}
        variants={textVariant}
      >
        Join Us On
      </motion.h2>

      {/* Heading 1 - The Path To Better Health */}
      <motion.h1
        ref={refH1}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
        initial="hidden"
        animate={controlsH1}
        variants={textVariant}
        transition={{ delay: 0.2 }} // Delay to stagger animations
      >
        The Path To Better Health
      </motion.h1>

      {/* Description Paragraph */}
      <motion.p
        ref={refP}
        className="text-base md:text-lg lg:text-xl mb-8"
        initial="hidden"
        animate={controlsP}
        variants={textVariant}
        transition={{ delay: 0.4 }} // Delay to stagger animations
      >
        At Kifayti Health, we are dedicated to transforming kidney care and
        empowering <br className="hidden md:block" />
        patients. Join our community and take the first step towards a
        healthier, more <br className="hidden md:block" />
        vibrant life.
      </motion.p>

      {/* Input and Button Wrapper */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 mb-20 space-y-4 md:space-y-0 md:space-x-4">
        {/* Email Input Field */}
        <motion.div
          ref={refInput}
          className="flex items-center bg-white shadow-[0px_1.5px_20px_rgba(0,0,0,0.2)] rounded-md overflow-hidden w-full md:w-auto "
          initial="hidden"
          animate={controlsInput}
          variants={textVariant}
          transition={{ delay: 0.3 }} // Delay to stagger animations
        >
          {/* Icon */}
          <div className="px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a1 1 0 001.22 0L20 8m-17 0v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8l7.39-4.74a2 2 0 012.22 0L20 8"
              />
            </svg>
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="youremail123@gmail.com"
            className="bg-white w-full md:w-[320px] lg:w-[440px] p-4 outline-none text-gray-700 placeholder-gray-400"
          />
        </motion.div>

        {/* Subscribe Button */}
        <motion.button
          ref={refButton}
          className="bg-red-500 text-white px-8 py-[9.5px] rounded-md shadow-lg w-full md:w-auto"
          initial="hidden"
          animate={controlsButton}
          variants={textVariant}
          transition={{ delay: 0.8 }} // Delay to stagger animations
        >
          SUBSCRIBE
        </motion.button>
      </div>
    </div>
  );
};

export default DoctorContact;
