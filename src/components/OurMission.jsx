import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import backgroundImage from '../assets/figma images/Why us section.png';


const OurMission = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={ref} className="bg-gradient-to-b from-blue-50/90 to-blue-50/70 w-full flex justify-center items-center overflow-x-hidden py-20"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >   
      <motion.div
        className="container mx-auto max-w-4xl"
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div 
          className="bg-white shadow-lg rounded-2xl p-8 lg:p-12 text-center"
          variants={childVariant}
        >
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
            variants={childVariant}
          >
            Our <span className="text-teal-600 underline decoration-wavy decoration-teal-400/30 underline-offset-8">Mission</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-8"
            variants={childVariant}
          >
            Driven by the desire to find evidence-based solutions to shared challenges, 
            Kifayti Health was born. Our mission is deeply rooted in personal experience, 
            as we strive to empower individuals and families facing chronic conditions 
            with the tools and support they need to live healthier, fuller lives.
          </motion.p>
          
          <motion.p 
            className="text-teal-600 text-xl font-semibold"
            variants={childVariant}
          >
            Together, we're transforming the landscape of kidney health, one life at a time.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurMission;