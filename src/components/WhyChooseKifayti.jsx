import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import card1img from "../assets/figma images/Hospital Bed.png";
import card2img from "../assets/figma images/_0042.png";
import card3img from "../assets/figma images/Image.png";
import card4img from "../assets/figma images/Asset 1 1.png";
import card5img from "../assets/figma images/_0036.png";
import backgroundImage from "../assets/figma images/Why us section.png"; // Add your background image here

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1.0],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1.0],
    },
  },
};

const WhyChooseKifayti = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const headerControls = useAnimation();

  const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref3, inView3] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref4, inView4] = useInView({ threshold: 0.2, triggerOnce: false });
  const [ref5, inView5] = useInView({ threshold: 0.2, triggerOnce: false });
  const [headerRef, headerInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView1) controls1.start("visible");
    else controls1.start("hidden");
  }, [controls1, inView1]);

  React.useEffect(() => {
    if (inView2) controls2.start("visible");
    else controls2.start("hidden");
  }, [controls2, inView2]);

  React.useEffect(() => {
    if (inView3) controls3.start("visible");
    else controls3.start("hidden");
  }, [controls3, inView3]);

  React.useEffect(() => {
    if (inView4) controls4.start("visible");
    else controls4.start("hidden");
  }, [controls4, inView4]);

  React.useEffect(() => {
    if (inView5) controls5.start("visible");
    else controls5.start("hidden");
  }, [controls5, inView5]);

  React.useEffect(() => {
    if (headerInView) headerControls.start("visible");
    else headerControls.start("hidden");
  }, [headerControls, headerInView]);

  return (
    <div
      className="bg-gradient-to-b from-blue-50/90 to-blue-50/70 min-h-screen w-full flex justify-center items-center overflow-x-hidden py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-full px-4 lg:p-20">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial="hidden"
          animate={headerControls}
          variants={headerVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 inline-block relative">
            Why Choose{" "}
            <span className="text-orange-500 relative">
              Kifayti?
            </span>
          </h2>

          </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* First Card */}
          <motion.div
            ref={ref1}
            className="bg-white p-8 lg:px-28 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col text-left group hover:-translate-y-1 active:scale-[0.99]"
            style={{ boxShadow: "0 10px 20px rgba(0, 76, 109, 0.3)" }}
            initial="hidden"
            animate={controls1}
            variants={cardVariants}
          >
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 mb-4 group-hover:text-teal-800 transition-colors">
                Enhanced Specialist
                <br />
                Access
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our holistic approach ensures that we look after your physical
                health and emotional well-being. We're here to support you every
                step of the way.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl flex-grow h-[250px] bg-gray-50/50 relative">
              <img
                src={card1img}
                alt="Holistic Care"
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          <div className="grid gap-8">
            {/* Second Card - Updated for better mobile view */}
            <motion.div
              ref={ref2}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center md:items-start gap-6 group hover:-translate-y-1 active:scale-[0.99]"
              style={{ boxShadow: "0 10px 20px rgba(0, 76, 109, 0.3)" }}
              initial="hidden"
              animate={controls2}
              variants={cardVariants}
            >
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 mb-4 group-hover:text-teal-800 transition-colors">
                  Dedicated <br /> Patient Care <br /> Executive
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We create personalized treatment plans tailored to your needs
                  to provide you with the most effective care possible.
                </p>
              </div>
              <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48">
                <img
                  src={card3img}
                  alt="Treatment Plan"
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Third Card */}
            <motion.div
              ref={ref3}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 active:scale-[0.99]"
              style={{ boxShadow: "0 10px 20px rgba(0, 76, 109, 0.3)" }}
              initial="hidden"
              animate={controls3}
              variants={cardVariants}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between lg:mt-3 mb-6 gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl lg:mt-1  font-bold text-teal-900  leading-tight lg:leading-snug max-w-sm text-center md:text-left mb-4 md:mb-0 group-hover:text-teal-800 transition-colors">
                  Discounted Medicines & <br /> Lab Tests
                </h2>
                <img
                  src={card4img}
                  alt="Health Monitoring"
                  className="w-40 md:w-48 h-auto object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="text-gray-700 text-center md:text-left text-lg leading-relaxed">
                Our mobile app streamlines health monitoring, provides easy
                access to vital information, and facilitates seamless
                communication with your care team—wherever you are.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Fourth Card */}
          <motion.div
            ref={ref4}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 active:scale-[0.99]"
            style={{ boxShadow: "0 10px 20px rgba(0, 76, 109, 0.3)" }}
            initial="hidden"
            animate={controls4}
            variants={cardVariants}
          >
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 mb-4 group-hover:text-teal-800 transition-colors">
                Comprehensive Wellness
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We provide resources and support to help you maintain wellness
                in all aspects of life, tailored to your unique journey.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl flex-grow h-[250px] bg-gray-50/50 relative">
              <img
                src={card2img}
                alt="Wellness"
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          {/* Fifth Card */}
          <motion.div
            ref={ref5}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 active:scale-[0.99]"
            style={{ boxShadow: "0 10px 20px rgba(0, 76, 109, 0.3)" }}
            initial="hidden"
            animate={controls5}
            variants={cardVariants}
          >
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 mb-4 group-hover:text-teal-800 transition-colors">
                Personalized Support
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our team is committed to delivering personalized support for
                every stage of your healthcare journey.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl flex-grow h-[250px] bg-gray-50/50 relative">
              <img
                src={card5img}
                alt="Support"
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseKifayti;
