import React from 'react';
// import foundersImage from '../assets/images/aboutusowner.png';
import foundersImage from '../assets/figma images/cofounders.jpg';

const Aboutusmain = () => {
  return (
    <section className="bg-white pt-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Inspired By Personal Experience:
            <br />
            <span className="text-[#01C6BD]">The Genesis Of Kifayti</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Our journey began five years ago when my father-in-law, a renowned singer and fiercely independent
            individual, was diagnosed with uncontrolled diabetes and chronic kidney disease. Suddenly, his vibrant
            life came to a standstill as he faced numerous physical and psychological complications. As caregivers,
            my family and I were unprepared for the challenges that lay ahead. However, what we
            discovered was that we were not alone in this battle. Countless families faced similar struggles,
            navigating the complexities of chronic kidney disease without adequate support.
          </p>
        </div>

        <div className="lg:w-1/2 flex justify-end relative mt-10">
          <div className="relative">
            <img
              src={foundersImage}
              alt="Founders of Kifayti"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutusmain;
