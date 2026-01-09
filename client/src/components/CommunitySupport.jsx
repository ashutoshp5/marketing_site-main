import React from 'react';
import communityImage from '../assets/images/community1.png';
import backgroundImage from '../assets/figma images/how.png';

const CommunitySupport = () => {
  return (
    <section 
      className="relative w-full px-4 sm:px-6 md:px-8 lg:px-16 min-h-screen flex justify-center items-center py-12 md:py-16 lg:py-20 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="max-w-7xl w-full">
        {/* Card with white background */}
        <div className="bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-lg">
          
          {/* Text Content Container */}
          <div className="p-8 sm:p-10 md:p-12 lg:p-14">
            {/* Heading - exact line breaks from Figma */}
            <h2 className="text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] xl:text-[46px] font-bold text-[#0a4d5c] mb-4 md:mb-5 leading-[1.2]">
              Community Support<br />
              And Access To Counselling
            </h2>
            
            {/* Description - matching Figma text */}
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#0a4d5c] mb-0 leading-relaxed max-w-4xl">
              Kifayti health fosters CKD community support by connecting you (patients and caregivers) with local resources, virtual support groups and engagement with wellness experts to address your unique needs
            </p>
          </div>
          
          {/* Image - full width to card edges */}
          <div className="w-full">
            <img
              src={communityImage}
              alt="Community Support - Diverse group of people with colorful circular pattern background"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySupport;
