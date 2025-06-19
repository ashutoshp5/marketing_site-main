import React from 'react';
import "../components/Recognizedby.css";
import iimbimg from "../assets/images/iimb.png";
import usembimg from "../assets/images/usemabssy.png";
import nexus from "../assets/images/nexus-logo-headline-with-subline.png";
import iitm from "../assets/images/logo-black.png";
import GINSERV from "../assets/images/ginserv.png";
import wee from "../assets/figma images/wee.png";
import strtup from "../assets/figma images/10000strtup.png";
import iitd from "../assets/figma images/Indian_Institute_of_Technology_Delhi_Logo.svg.png";
import backgroundImage from '../assets/figma images/recognized by.png';

const RecognizedBy = () => {
    const logos = [iimbimg, usembimg, nexus, iitm, GINSERV, wee, strtup, iitd];

    return (
      <div 
        className="logos bg-gradient-to-b from-blue-50/90 to-blue-50/70 w-full flex flex-col justify-center items-center overflow-x-hidden py-20"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 -mt-8">Recognized By</h2>

        <div className="logos-slide">
          {/* Display logos twice for seamless scrolling */}
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt={`Logo ${index}`} />
          ))}
          {logos.map((logo, index) => (
            <img key={index + logos.length} src={logo} alt={`Logo ${index}`} />
          ))}
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt={`Logo ${index}`} />
          ))}
          {logos.map((logo, index) => (
            <img key={index + logos.length} src={logo} alt={`Logo ${index}`} />
          ))}
        </div>
      </div>
    );
};

export default RecognizedBy;
