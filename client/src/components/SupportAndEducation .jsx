import React from 'react';
import Blogpost from './Blogpost';
import { useNavigate } from 'react-router-dom';

const SupportAndEducation = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/contact');
  };

  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
      {/* Section One */}
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-8">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black text-left">
            Support And <br className='max-sm:hidden'/> Education
          </h2>

          {/* Section Description & Button */}
          <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed text-left sm:text-right max-w-xl">
              We offer a wealth of educational resources, support <br className='max-sm:hidden'/> groups and continuous communication to help you stay <br className='max-sm:hidden'/> informed and engaged in health management.
            </p>
            
            <button
              onClick={handleRedirect}
              aria-label="Request callback"
              className="bg-[#FF4A2F] text-white py-2.5 px-6 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-[#e63d24] transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap"
            >
              <span>Request callback</span>
              <span className="text-2xl mb-0.5 leading-none" aria-hidden="true">»</span>
            </button>
          </div>
        </div>
      </div>

      {/* Blogpost Component */}
      <Blogpost />
    </section>
  );
};

export default SupportAndEducation;
