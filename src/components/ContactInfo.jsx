import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="bg-white py-16 -mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-extrabold text-center text-gray-900 mb-12"
          variants={itemVariants}
        >
          Get in Touch
        </motion.h2>
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-12 lg:space-y-0 lg:space-x-12">
          <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14031.109605279768!2d77.6032974502057!3d12.935883124214447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1676370153d1%3A0xb7f1b6fe8f8bbd71!2sBangalore%2C%20Karnataka%20560100!5e0!3m2!1sen!2sin!4v1639140744167!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </motion.div>
          <motion.div className="w-full lg:w-1/2 space-y-8" variants={itemVariants}>
            <ContactItem
              icon={<MapPin className="w-6 h-6 text-[#FF4A2F]" />}
              title="Address"
              content="8/2, Beratan Agrahara Chikkabegur, Bangalore, Karnataka 560100"
            />
            {/* Customer Support - Clickable */}
            <ContactItem
              icon={<Phone className="w-6 h-6 text-[#FF4A2F]" />}
              title="Customer Support"
              content={
                <a 
                  href="tel:+919884040400" 
                  className="text-gray-600 underline hover:text-[#FF4A2F]"
                  aria-label="Call Customer Support"
                >
                  +91 98840 40400
                </a>
              }
            />
            {/* Email Address - Clickable */}
            <ContactItem
              icon={<Mail className="w-6 h-6 text-[#FF4A2F]" />}
              title="Email Address"
              content={
                <a 
                  href="mailto:contactus@kifaytihealth.com" 
                  className="text-gray-600 underline hover:text-[#FF4A2F]"
                  aria-label="Send Email to Contact Us"
                >
                  contactus@kifaytihealth.com
                </a>
              }
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ContactItem = ({ icon, title, content }) => (
  <motion.div 
    className="flex items-start space-x-4"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex-shrink-0">
      <div className="rounded-full p-3 bg-[#FF4A2F1A] shadow-md border border-[#FF4A2F] hover:shadow-[0px_0px_15px_#FF4A2F] transition duration-300 ease-in-out transform hover:scale-110">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </motion.div>
);

export default ContactInfo;
