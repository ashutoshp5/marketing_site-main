import React, { useEffect, useState } from 'react';
import "../components/Recognizedby.css";
import backgroundImage from '../assets/figma images/recognized by.png';
import { getApiBaseUrl } from '../lib/apiBase';

const RecognizedBy = () => {
    const [logos, setLogos] = useState([]);

    useEffect(() => {
      const fetchLogos = async () => {
        try {
          const API_BASE_URL = getApiBaseUrl();
          const response = await fetch(`${API_BASE_URL}/recognized-logos`);
          if (!response.ok) return;
          const data = await response.json();
          setLogos(Array.isArray(data) ? data : []);
        } catch {
          // Keep UI stable; fail silently.
        }
      };

      fetchLogos();
    }, []);

    const logoUrls = logos
      .map((l) => ({
        src: l?.imageUrl,
        alt: (l?.alt || '').trim(),
        id: l?._id,
      }))
      .filter((l) => Boolean(l.src));

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
          {logoUrls.map((logo, index) => (
            <img key={logo.id || index} src={logo.src} alt={logo.alt || `Logo ${index}`} />
          ))}
          {logoUrls.map((logo, index) => (
            <img key={`${logo.id || index}-dup1`} src={logo.src} alt={logo.alt || `Logo ${index}`} />
          ))}
          {logoUrls.map((logo, index) => (
            <img key={`${logo.id || index}-dup2`} src={logo.src} alt={logo.alt || `Logo ${index}`} />
          ))}
          {logoUrls.map((logo, index) => (
            <img key={`${logo.id || index}-dup3`} src={logo.src} alt={logo.alt || `Logo ${index}`} />
          ))}
        </div>
      </div>
    );
};

export default RecognizedBy;
