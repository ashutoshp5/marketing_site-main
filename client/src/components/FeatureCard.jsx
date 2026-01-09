import React from 'react';
import backgroundImage from '../assets/figma images/and so much more.png';
import image1 from '../assets/images/clock.png'; 
import image2 from '../assets/images/leverage.png'; 
import image3 from '../assets/images/optimize.png'; 
import image4 from '../assets/images/patient-engagement.png'; 
import image5 from '../assets/images/delivery-scooter.png'; 
import image6 from '../assets/images/brain-boost.png'; 

const FeatureCard = ({ image, description }) => {
  return (
    <div
      className="
        bg-white
        px-3 py-4 md:px-6 md:py-7
        rounded-xl
        shadow-md md:shadow-lg
        flex flex-col
      "
    >
      <div className="mb-3 md:mb-4">
        <img 
          src={image} 
          alt="Feature icon" 
          className="w-8 h-8 md:w-[42px] md:h-[42px] object-contain"
        />
      </div>
      <p className="text-[#004C6D] text-[11px] md:text-sm leading-[1.5] text-left">
        {description}
      </p>
    </div>
  );
};

const FeaturesGrid = () => {
  const features = [
    {
      image: image1,
      description: 'Reduce retrieval time by upto 90% by accessing records from a single point',
    },
    {
      image: image2,
      description: 'Leverage data analysis to enhance your marketing effectiveness',
    },
    {
      image: image3,
      description: 'Optimize patient management & increase your availability enhancing revenue generation',
    },
    {
      image: image4,
      description: 'Enhance overall patient experience through visuals & continuous engagement',
    },
    {
      image: image5,
      description: 'Enhance last mile engagement with patients with delivery of medicines & tests with our partners',
    },
    {
      image: image6,
      description: 'Boost patient compilance leading to higher engagement and better treatment outcomes',
    },
  ];

  return (
    <section
      className="
        relative w-full
        px-3 sm:px-6
        py-10 md:p-20 lg:p-24
        flex justify-center
        overflow-hidden
      "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Outer mobile frame with dotted border */}
      <div className="
        relative z-10
        w-full
        max-w-[360px]
        bg-transparent
        md:bg-transparent
        md:max-w-7xl
      ">
        {/* Mobile framed block */}
        <div className="
          px-3 py-4
          md:border-none md:px-0 md:py-0
          bg-white/0
        ">
          {/* Mobile heading inside frame */}
          <h2 className="text-xl font-bold text-center text-black mb-4 md:hidden">
            And So Much More
          </h2>

          {/* Desktop heading outside frame */}
          <h2 className="hidden md:block text-3xl md:text-5xl font-bold text-center text-black mb-12">
            And So Much More
          </h2>

          {/* Inner grid wrapper (white panel like in Figma) */}
          <div className="
            bg-transparent md:bg-transparent
            rounded-2xl
            pt-2
          ">
            {/* Cards Grid:
                - mobile: 2 columns within framed area
                - md+: 3 columns as before */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
