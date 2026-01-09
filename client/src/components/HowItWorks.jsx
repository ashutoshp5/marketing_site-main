import React from 'react';

// Import your custom icons from assets
import icon1 from '../assets/icons/patient-setup.png';
import icon2 from '../assets/icons/health-metrics.png';
import icon3 from '../assets/icons/medicine-management.png';
import icon4 from '../assets/icons/engagement.png';
import icon5 from '../assets/icons/predictive-analysis.png';
import icon6 from '../assets/icons/outcome-tracking.png';

// Card component – desktop stays same, mobile adjusted
const FeatureCard = ({ icon, title }) => {
  return (
    <div
      className="bg-white shadow-xl md:shadow-2xl p-5 md:p-8 lg:p-12 rounded-2xl md:rounded-[20px] flex flex-col items-start h-full transition-transform duration-300 hover:scale-105"
    >
      {/* Icon */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <img
          src={icon}
          alt={title}
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
        />
      </div>

      {/* Text */}
      <p className="text-[#004C6D] text-[13px] md:text-base lg:text-lg leading-[1.4] md:leading-[1.5] font-medium lg:font-semibold">
        {title}
      </p>
    </div>
  );
};

const HowItWorks = () => {
  const features = [
    { icon: icon1, title: "Patient's account setup and onboarding" },
    { icon: icon2, title: 'Continuous monitoring of health metrics' },
    { icon: icon3, title: 'Medicine management & tracking' },
    { icon: icon4, title: 'Continuous engagement by executives' },
    { icon: icon5, title: 'Predictive analysis & data driven decisions' },
    { icon: icon6, title: 'Outcome tracking & preventive steps' },
  ];

  return (
    <div className="bg-white md:bg-[#F5F7FA] py-12 md:py-20 lg:py-24">
      <div className="container max-w-md md:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Mobile heading */}
        <h2 className="text-[22px] font-bold text-center text-black mb-8 md:hidden">
          And So Much More
        </h2>

        {/* Desktop/tablet heading */}
        <h2 className="hidden md:block text-4xl sm:text-5xl md:text-[48px] font-bold text-center text-black mb-12 md:mb-16 lg:mb-20">
          How Does It Work?
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
