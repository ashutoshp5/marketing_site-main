// import React from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { ArrowRight } from 'lucide-react';
// import communityImage from '../assets/images/community.png'; // Using the original image path

// const CommunitySupport = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.3,
//     triggerOnce: false,
//   });

//   React.useEffect(() => {
//     if (inView) {
//       controls.start('visible');
//     } else {
//       controls.start('hidden');
//     }
//   }, [controls, inView]);

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.2 }
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: 'easeOut' }
//     },
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white py-24 px-6">
//       <motion.div
//         ref={ref}
//         initial="hidden"
//         animate={controls}
//         variants={containerVariants}
//         className="container mx-auto"
//       >
//         <motion.h2 
//           variants={itemVariants}
//           className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center"
//         >
//           Community Support & Counselling
//         </motion.h2>
        
//         <div className="flex flex-col md:flex-row items-center justify-between gap-12">
//           <motion.div variants={itemVariants} className="md:w-1/2">
//             <p className="text-xl text-gray-700 mb-6 leading-relaxed">
//               Our team of dedicated specialists provides comprehensive, coordinated care to help you manage your CKD journey effectively and with confidence.
//             </p>
//             <ul className="space-y-4 mb-8">
//               {['Nephrologists', 'Dietitians', 'Social Workers', 'Mental Health Specialists'].map((specialist, index) => (
//                 <motion.li
//                   key={index}
//                   variants={itemVariants}
//                   className="flex items-center text-lg text-gray-600"
//                 >
//                   <ArrowRight className="text-blue-500 mr-2" size={20} />
//                   {specialist}
//                 </motion.li>
//               ))}
//             </ul>
//             <motion.button
//               variants={itemVariants}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Get Support Now
//             </motion.button>
//           </motion.div>
          
//           <motion.div 
//             variants={itemVariants} 
//             className="md:w-1/2"
//           >
//             <img
//               src={communityImage}
//               alt="Community Support"
//               className="w-full h-auto rounded-lg shadow-2xl"
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CommunitySupport;

import React from 'react';
import { motion } from 'framer-motion';
import communityImage from '../assets/images/community1.png'; // Replace with your image

const CommunitySupport = () => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className=" h-full py-12 px-4 sm:px-6 lg:px-8  rounded-xl">
      <motion.div
        className="max-w-5xl bg-white mx-auto text-center rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // Animation reactivates when scrolled back
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Text Section */}
        <motion.h1
          className="text-4xl font-extrabold text-left px-8 py-4 text-teal-900 sm:text-5xl rounded-xl"
          variants={textVariants}
        >
          Community Support
          <br />
          And Access To Counselling
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-left px-8 text-teal-800 rounded-xl"
          variants={textVariants}
        >
          Our team of dedicated nephrologists, dietitians, social workers, and mental health
          specialists come together to provide comprehensive, coordinated care to help you manage
          your CKD.
        </motion.p>

        {/* Image Section */}
        <motion.div
          className="mt-10 flex justify-center rounded-xl"
          variants={imageVariants}
        >
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={communityImage}
              alt="Group of people"
              className="relative z-10 max-w-full mx-auto rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CommunitySupport;
