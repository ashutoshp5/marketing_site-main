// import React from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import specialistImage from '../assets/images/specialist.jpg';
// import careExecutiveImage from '../assets/images/customer.jpg';
// import medicinesImage from '../assets/images/medicine.jpg';

// const ServicesSection = () => {
//   const ServiceCard = ({ title, description, image, altText }) => {
//     const [ref, inView] = useInView({
//       triggerOnce: false,
//       threshold: 0.2,
//     });

//     const cardVariants = {
//       hidden: { opacity: 0, y: 50 },
//       visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//           duration: 0.6,
//           ease: [0.6, -0.05, 0.01, 0.99],
//         },
//       },
//     };

//     return (
//       <motion.div
//         ref={ref}
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"}
//         variants={cardVariants}
//         className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
//       >
//         <div className="aspect-w-16 aspect-h-9">
//           <img
//             src={image}
//             alt={altText}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="p-6">
//           <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
//           <p className="text-gray-600">{description}</p>
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white py-24 px-6">
//       <div className="container mx-auto">
//         <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-16">
//           And So Much More
//         </h2>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div className="lg:row-span-2">
//             <ServiceCard
//               title="Enhanced Specialist Access"
//               description="Access specialists even in remote areas through our telemedicine services and collaborative care network. Spot your nearest Nephrologist and Dialysis centre!"
//               image={specialistImage}
//               altText="Enhanced Specialist Access"
//             />
//           </div>
          
//           <div>
//             <ServiceCard
//               title="Dedicated Patient Care Executive"
//               description="A patient care executive works with you to understand the patient need & ensure relevant care is made available."
//               image={careExecutiveImage}
//               altText="Dedicated Patient Care Executive"
//             />
//           </div>
          
//           <div>
//             <ServiceCard
//               title="Discounted Medicines & Lab Tests"
//               description="Utilize our ecosystem to the fullest and avail discounts on medicines from our trusted partners."
//               image={medicinesImage}
//               altText="Discounted Medicines"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesSection;import React from "react";
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import card1img from '../assets/figma images/medical-professional-edit 1.png';
import card2img from '../assets/figma images/customer-relationship 1.png';
import card3img from '../assets/figma images/colorful-pills-lying-glass 1.png';

// Animation variants for cards and header
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const WhyChooseKifayti = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const headerControls = useAnimation();

  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  React.useEffect(() => {
    if (inView1) controls1.start('visible');
    if (!inView1) controls1.start('hidden');
  }, [controls1, inView1]);

  React.useEffect(() => {
    if (inView2) controls2.start('visible');
    if (!inView2) controls2.start('hidden');
  }, [controls2, inView2]);

  React.useEffect(() => {
    if (inView3) controls3.start('visible');
    if (!inView3) controls3.start('hidden');
  }, [controls3, inView3]);

  React.useEffect(() => {
    if (headerInView) headerControls.start('visible');
    if (!headerInView) headerControls.start('hidden');
  }, [headerControls, headerInView]);

  return (
    <div className="bg-cover bg-center min-h-screen w-full flex justify-center items-center">
      <div className="py-12 z-[1] w-full max-w-7xl">
        {/* Header with Animation */}
        <motion.h2
          ref={headerRef}
          className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-16"
          initial="hidden"
          animate={headerControls}
          variants={headerVariants}
        >
          And So Much More
        </motion.h2>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* First Column: First Card Only */}
          <motion.div
            ref={ref1}
            className="bg-white p-6 rounded-xl flex flex-col text-left mx-auto max-w-xs md:max-w-md lg:max-w-full md:px-4"
            style={{
              boxShadow: '0 10px 20px rgba(0, 76, 109, 0.3)', // Custom shadow with dark bluish tone
            }}
            initial="hidden"
            animate={controls1}
            variants={cardVariants}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 mb-4">
              Enhanced Specialist
              <br />
              Access
            </h2>
            <p className="text-gray-700 mb-6">
              Our holistic approach ensures that we look after your physical
              health and emotional well-being. We're here to support you every
              step of the way.
            </p>
            <img
              src={card1img}
              alt="Holistic Care"
              className="w-full h-[200px] md:h-[250px] flex-grow -mb-6"
            />
          </motion.div>
  
          {/* Second Column: Second and Third Cards Stacked */}
          <div className="grid gap-6">
            {/* Second Card */}
            <motion.div
              ref={ref2}
              className="bg-white p-6 rounded-xl grid grid-cols-1 md:grid-cols-3 items-center mx-auto max-w-xs md:max-w-md lg:max-w-full md:px-4"
              style={{
                boxShadow: '0 10px 20px rgba(0, 76, 109, 0.3)', // Custom shadow with dark bluish tone
              }}
              initial="hidden"
              animate={controls2}
              variants={cardVariants}
            >
              {/* Left Side: Text Part */}
              <div className="md:col-span-2 mt-6 mb-6 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 mb-4">
                  Dedicated <br /> Patient Care <br /> Executive
                </h2>
                <p className="text-gray-700">
                  We create personalized treatment plans tailored to your needs
                  to provide you with the most effective care possible.
                </p>
              </div>
  
              {/* Right Side: Image Part */}
              <div className="flex justify-center md:justify-end">
                <img
                  src={card2img}
                  alt="Treatment Plan"
                  className="w-24 md:w-40 h-[150px] md:h-[200px] lg:-mb-10"
                />
              </div>
            </motion.div>
  
            {/* Third Card */}
            <motion.div
              ref={ref3}
              className="bg-white p-6 rounded-xl text-center mx-auto max-w-xs md:max-w-md lg:max-w-full md:px-4"
              style={{
                boxShadow: '0 10px 20px rgba(0, 76, 109, 0.3)', // Custom shadow with dark bluish tone
              }}
              initial="hidden"
              animate={controls3}
              variants={cardVariants}
            >
              {/* First Row */}
              <div className="flex flex-col md:flex-row items-start justify-between mb-4">
                {/* Left Column: Heading */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 md:text-left mb-4 md:mb-0 md:mr-6">
                  Discounted Medicines & <br />
                  Lab Tests
                </h2>
                {/* Right Column: Image */}
                <img
                  src={card3img}
                  alt="Health Monitoring"
                  className="w-28 md:w-40 h-auto md:ml-6"
                />
              </div>
              {/* Second Row: Paragraph */}
              <p className="text-gray-700 md:text-left">
                Our mobile app streamlines health monitoring, provides easy
                access to vital information, and facilitates seamless
                communication with your care team—wherever you are.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default WhyChooseKifayti;


