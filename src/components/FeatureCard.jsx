import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, TrendingUp, Wallet, Users, Truck, CheckSquare } from 'lucide-react';
import backgroundImage from '../assets/figma images/and so much more.png'; // Add your background image here

// Animation variants for cards and header
const cardVariants = {
  hidden: { opacity: 0},
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

const FeatureCard = ({ icon: Icon, description, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
    if (!inView) controls.start('hidden');
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg transform transition duration-300 hover:scale-105 max-w-xs mx-auto"
      style={{
        boxShadow: '0 10px 20px rgba(0, 76, 109, 0.3)', // Custom shadow with dark bluish tone
      }}
      initial="hidden"
      animate={controls}
      variants={{
        ...cardVariants,
        visible: { ...cardVariants.visible, transition: { ...cardVariants.visible.transition, delay: index * 0.15 } },
      }}
    >
      <Icon className="text-teal-800 mb-4" size={40} />
      <h3 className="text-lg font-semibold text-teal-700 mb-2">{description}</h3>
    </motion.div>
  );
};

const FeaturesGrid = () => {
  const headerControls = useAnimation();
  const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (headerInView) headerControls.start('visible');
    if (!headerInView) headerControls.start('hidden');
  }, [headerControls, headerInView]);

  const features = [
    {
      icon: Clock,
      description: 'Reduce retrieval time by up to 90% by accessing records from a single point',
    },
    {
      icon: TrendingUp,
      description: 'Leverage data analysis to enhance your marketing effectiveness',
    },
    {
      icon: Wallet,
      description: 'Optimize patient management & increase your availability enhancing revenue generation',
    },
    {
      icon: Users,
      description: 'Enhance overall patient experience through visuals & continuous engagement',
    },
    {
      icon: Truck,
      description: 'Enhance last mile engagement with patients with delivery of medicines & tests with our partners',
    },
    {
      icon: CheckSquare,
      description: 'Boost patient compliance leading to higher engagement and better treatment outcomes',
    },
  ];

  return (
    <div
      className="bg-gradient-to-b from-blue-50/90 to-blue-50/70 w-full flex justify-center items-center overflow-x-hidden py-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center px-8 lg:px-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
