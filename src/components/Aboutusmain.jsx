import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import foundersImage from '../assets/images/aboutusowner.png';
import foundersImage from '../assets/figma images/cofounders.png';


const Aboutusmain = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="bg-white py-20 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:w-1/2 text-left"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Inspired By Personal Experience:
            <br />
            <span className="text-teal-600">The Genesis Of Kifayti</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Our journey began five years ago when my father-in-law, a renowned singer and fiercely independent
            individual, was diagnosed with uncontrolled diabetes and chronic kidney disease. Suddenly, his vibrant
            life came to a standstill as he faced numerous physical and psychological complications. As caregivers,
            my family and I were unprepared for the challenges that lay ahead. However, what we discovered was that we
            were not alone in this battle. Countless families faced similar struggles, navigating the complexities of
            chronic kidney disease without adequate support.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="lg:w-1/2 relative mt-10"
        >
          <div className="relative">
            <img
              src={foundersImage}
              alt="Founders of Kifayti"
              className="w-full h-auto rounded-lg shadow-md"
            />
            {/* <div className="absolute bottom-4 left-4 text-white text-shadow">
              <p className="text-xl font-semibold">Aushtosh Pandey</p>
              <p className="text-sm">Co-Founder</p>
            </div>
            <div className="absolute bottom-4 right-4 text-white text-right text-shadow">
              <p className="text-xl font-semibold">Mansi Pandey</p>
              <p className="text-sm">Co-Founder</p>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Aboutusmain;