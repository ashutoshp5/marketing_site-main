import React, { useEffect } from 'react';
import { Clock, TrendingUp, Wallet, Users, Truck, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Card component with enhanced animations
const FeatureCard = ({ icon: Icon, description, index }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false, // Animation triggers every time the section is in view
    threshold: 0.2, // Triggers when 20% of the card is visible for early animation
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94], // Smooth easing function
        delay: index * 0.15 // Increase the delay slightly for each card
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg transform transition duration-300 hover:scale-105 max-w-xs mx-auto"
      style={{
        boxShadow: '0 10px 20px rgba(0, 76, 109, 0.3)', // Custom shadow with dark bluish tone
      }}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <Icon className="text-teal-800 mb-4" size={40} />
      <h3 className="text-lg font-semibold text-teal-700 mb-2">{description}</h3>
    </motion.div>
  );
};

const HowItWorks = () => {
  const features = [
    {
      icon: Clock,
      description: "Reduce retrieval time by up to 90% by accessing records from a single point",
    },
    {
      icon: TrendingUp,
      description: "Leverage data analysis to enhance your marketing effectiveness",
    },
    {
      icon: Wallet,
      description: "Optimize patient management & increase your availability enhancing revenue generation",
    },
    {
      icon: Users,
      description: "Enhance overall patient experience through visuals & continuous engagement",
    },
    {
      icon: Truck,
      description: "Enhance last mile engagement with patients with delivery of medicines & tests with our partners",
    },
    {
      icon: CheckSquare,
      description: "Boost patient compliance leading to higher engagement and better treatment outcomes",
    },
  ];

  return (
    <div className="bg-gradient-to-br py-16">
      <div className="container lg:w-[1300px] mx-auto px-4">
        {/* Animated Heading */}
        <motion.h2
          className="text-4xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          And So Much More
        </motion.h2>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-9 justify-center px-8 lg:px-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
