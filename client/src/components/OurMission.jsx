import React from 'react';
import backgroundImage from '../assets/figma images/Why us section.png';

const OurMission = () => {
  return (
    <section 
      className="bg-gradient-to-b from-blue-50/90 to-blue-50/70 w-full flex justify-center items-center overflow-x-hidden py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >   
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Background image area */}
          <div className="lg:w-1/2">
            {/* This space uses the background image */}
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Our <span className="text-[#01C6BD]"><br className='max-sm:hidden'/> Mission</span>
            </h2>
          </div>
          
          {/* Right side - Mission content */}
          <div className="lg:w-1/2">            
            <p className="text-gray-700 text-lg leading-relaxed ">
              Driven by the desire to find evidence-based solutions to these shared challenges, 
              Kifayti Health was born. Our mission is deeply rooted in personal experience, 
              as we strive to empower individuals and families facing chronic conditions 
              with the tools and support they need to live healthier, fuller lives.            
              Together, we're transforming the landscape of kidney health, one life at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
