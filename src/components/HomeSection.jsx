
import React from 'react';
import kidneyImage1 from '../assets/figma images/Kidney 4.png';
import kidneyImage2 from '../assets/figma images/Kidney 3.png';
import "../components/HomeSection.css"

const HomeSection = () => {
  return (
    <div className="bg-white py-16 sm:py-24 md:py-32 overflow-x-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6">
        {/* Left Kidney Image */}
        <div className="w-2/3 sm:w-1/2 md:w-1/3 flex justify-center animate-floating mt-8">
          <img src={kidneyImage1} alt="Kidney" className="w-full h-auto max-w-full" />
        </div>

        {/* Center Text */}
        <div className="w-full md:w-1/3 text-center my-8 md:my-0 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-3">
            <span className='block mb-3'>Your Trusted</span>  
            <span className='block mb-3'>Partner in</span>  
            <span className="text-teal-500">Kidney Care</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            A Compassionate Approach To Managing <br />
            <span className="font-semibold text-teal-800">Chronic Kidney Disease</span>
          </p>
        </div>

        {/* Right Kidney Image */}
        <div className="w-2/3 sm:w-1/2 md:w-1/3 flex justify-center animate-floating mx-auto mt-8">
          <img src={kidneyImage2} alt="Kidney" className="w-full h-auto max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
