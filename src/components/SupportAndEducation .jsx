import React from 'react';
import Blogpost from './Blogpost';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const SupportAndEducation = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRedirect = () => {
    navigate('/contact'); // Redirect to the Contact page
  };
  return (
    <section className="bg-white py-12 px-4 md:px-16">
      {/* Section One */}
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          {/* Section Title */}
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4 lg:mb-0 lg:w-1/2">
            Support And <br className="block lg:hidden" /> Education
          </h2>
          {/* Section Description */}
          <div className="lg:text-right lg:ml-6 w-full lg:w-1/2">
            <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
              We offer a wealth of educational resources, support <br className="hidden lg:block" />
              groups and continuous communication to help you stay <br className="hidden lg:block" />
              informed and engaged in health management.
            </p>
            {/* Responsive Button */}
            <button onClick={handleRedirect}  className="bg-[#FF4A2F] text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 w-full md:w-auto lg:w-full xl:w-auto">
            Request Callback &rarr;
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
