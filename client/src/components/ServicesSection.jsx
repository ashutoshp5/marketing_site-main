import React from 'react';
import card1img from '../assets/figma images/medical-professional-edit 1.png';
import card2img from '../assets/figma images/customer-relationship 1.png';
import card3img from '../assets/figma images/colorful-pills-lying-glass 1.png';
import backgroundImage from '../assets/figma images/how.png';

const WhyChooseKifayti = () => {
  return (
    <section
      className="relative w-full px-4 sm:px-6 lg:px-8 min-h-screen flex justify-center items-center py-16 md:py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-10 md:mb-12">
          And So Much More.
        </h2>

        {/* Cards Container */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
          {/* Left Card - Enhanced Specialist Access */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden lg:w-1/2 flex flex-col">
            <div className="p-6 md:p-8 lg:p-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004C6D] mb-3 md:mb-4 leading-tight">
                Enhanced Specialist<br />Access
              </h3>
              <p className="text-[#004C6D] text-sm md:text-base leading-relaxed">
                Access specialists even in remote areas through our telemedicine 
                services and collaborative care network. Spot your{' '}
                <span className="font-bold">nearest Nephrologist</span>{' '}
                and Dialysis centre!
              </p>
            </div>
            <div className="flex-grow flex items-end justify-center  pb-0">
              <img
                src={card1img}
                alt="Doctor with telemedicine app"
                className="w-auto sm:h-56 md:h-64 lg:h-80 object-contain"
              />
            </div>
          </div>

          {/* Right Column - Two stacked cards */}
          <div className="flex flex-col gap-5 lg:gap-6 lg:w-1/2">
            
            {/* Top Right Card - Dedicated Patient Care Executive */}
            <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004C6D] mb-3 md:mb-4 leading-tight">
                  Dedicated<br />Patient Care<br />Executive
                </h3>
                <p className="text-[#004C6D] text-sm md:text-base leading-relaxed">
                  A patient care executive works with you to understand the patient 
                  need & ensure relevant care is made available.
                </p>
              </div>
              <div className="flex-shrink-0 -mb-6 md:-mb-8 lg:-mb-10">
                <img
                  src={card2img}
                  alt="Patient care executive"
                  className="w-32 sm:w-36 md:w-44 lg:w-40 h-auto object-contain"
                />
              </div>
            </div>

            {/* Bottom Right Card - Discounted Medicines & Lab Tests */}
            <div className="bg-white rounded-3xl shadow-md p-6 md:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 mb-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004C6D] leading-tight">
                  Discounted<br />Medicines &<br />Lab Tests
                </h3>
                <div className="flex-shrink-0">
                  <img
                    src={card3img}
                    alt="Medicines and lab tests"
                    className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-[#004C6D] text-sm md:text-base leading-relaxed">
                Utilize our ecosystem to the fullest and avail discounts on 
                medicines from our trusted partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseKifayti;
