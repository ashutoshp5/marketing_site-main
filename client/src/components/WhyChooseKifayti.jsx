import { memo } from 'react';
import card1img from "../assets/figma images/Hospital Bed.jpg";
import card2img from "../assets/figma images/_0042.png";
import card3img from "../assets/figma images/Image.png";
import card4img from "../assets/figma images/Asset 1 1.png";
import card5img from "../assets/figma images/_0036.png";
import backgroundImage from "../assets/figma images/Why us section.png";

const WhyChooseKifayti = memo(() => {
  return (
    <div
      className="min-h-screen w-full flex justify-center items-center overflow-x-hidden py-16 md:py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className=" sm:flex justify-between text-left mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Why Choose{" "} <br className='max-sm:hidden'/>           <span className="text-orange-500">Kifayti?</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-3 max-w-md">
            We provide comprehensive & personalized support, tools & resources you need to manage your CKD with confidence and ease.
          </p>
        </div>

        {/* Grid Layout - Matches the design exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Row 1: Left - Holistic Care (tall card) */}
          <div
            className="bg-white p-6 lg:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group"
            style={{ boxShadow: "0 4px 12px rgba(0, 76, 109, 0.1)" }}
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-3xl font-bold text-teal-900 mb-3">
                Holistic Care <br  /> For A Better Life
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our holistic approach ensures that we look after your physical health and emotional well-being. We're here to support you every step of the way.
              </p>
            </div>
            <div className="flex-grow flex items-end justify-center rounded-2xl overflow-hidden bg-white p-4">
              <img
                src={card1img}
                alt="Hospital bed representing holistic care"
                loading="lazy"
                className="w-full max-w-[480px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Row 1: Right - Two stacked cards */}
          <div className="grid grid-rows-2 gap-6">
            
            {/* Tailored Treatment Plan */}
            <div
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-row items-center gap-4 group"
              style={{ boxShadow: "0 4px 12px rgba(0, 76, 109, 0.1)" }}
            >
              <div className="flex-1">
                <h3 className="text-lg md:text-3xl font-bold text-teal-900 mb-2">
                  Tailored<br />Treatment Plan
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  We create personalized treatment plans tailored to your needs to provide you with the most effective care possible.
                </p>
              </div>
              <div className="flex-shrink-0 w-24 md:w-32">
                <img
                  src={card3img}
                  alt="Medical professional"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Health Monitoring */}
            <div
              className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-row items-center gap-4 group"
              style={{ boxShadow: "0 4px 12px rgba(0, 76, 109, 0.1)" }}
            >
              <div className="flex-1">
                <h3 className="text-lg md:text-3xl font-bold text-teal-900 mb-2">
                  Health Monitoring<br />Anytime, Anywhere
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Our mobile app streamlines health monitoring, provides easy access and facilitates seamless communication with your care team—wherever you are.
                </p>
              </div>
              <div className="flex-shrink-0 w-24 md:w-32">
                <img
                  src={card4img}
                  alt="Mobile health monitoring"
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

          </div>

          {/* Row 2: Proactive Care */}
          <div
            className="bg-white p-6 lg:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group"
            style={{ boxShadow: "0 4px 12px rgba(0, 76, 109, 0.1)" }}
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-3xl font-bold text-teal-900 mb-3">
                Proactive Care
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                By focusing on early detection and management of risk factors, we help you maintain your kidney function & overall health for the long term.
              </p>
            </div>
            <div className="flex-grow flex items-end justify-center rounded-2xl overflow-hidden bg-white p-4">
              <img
                src={card2img}
                alt="Proactive healthcare"
                loading="lazy"
                className="w-full max-w-[380px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Row 2: Expert Care Team */}
          <div
            className="bg-white p-6 lg:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group"
            style={{ boxShadow: "0 4px 12px rgba(0, 76, 109, 0.1)" }}
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-3xl font-bold text-teal-900 mb-3">
                Expert Care Team
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our dedicated team of trained specialists and wellness experts collaborate to deliver comprehensive and personalized care empowering you to manage your CKD effectively.
              </p>
            </div>
            <div className="flex-grow flex items-end justify-center rounded-2xl overflow-hidden bg-white p-4">
              <img
                src={card5img}
                alt="Expert healthcare team"
                loading="lazy"
                className="w-full max-w-[280px] h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

WhyChooseKifayti.displayName = 'WhyChooseKifayti';

export default WhyChooseKifayti;