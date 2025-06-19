import React, { useState, useEffect } from 'react';
import insta from "../assets/figma images/Instagram.png";
import fb from "../assets/figma images/Facebook.png";
import kifayti from "../assets/figma images/kifaytifooterlogo 1.png";
import styles from './Footer.module.css';

function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Layout
  if (isMobile) {
    return (
      <footer className={`${styles.footer} text-white py-10 px-4 md:px-8`}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 lg:space-x-16">
            
            {/* Left Column */}
            <div className="space-y-6 md:w-1/2 lg:w-5/12">
              {/* Logo and Heading */}
              <div className="flex flex-col items-start md:flex-row md:items-center space-y-2 md:space-y-0">
                <img src={kifayti} alt="kifayti logo" className="w-12 h-12" />
                <h2 className="text-3xl md:ml-3 font-semibold">Kifayti Health</h2>
              </div>
            
              {/* Contact Information */}
              <div className="space-y-6 mt-8">
                <div>
                  <h3 className="font-bold mb-2">ADDRESS</h3>
                  <p className="text-sm max-w-md">8/2, Beratan Agrahara Chikkabegur, Bangalore, Karnataka 560100</p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">CUSTOMER SUPPORT</h3>
                  <p className="text-sm">+91 98840 40400</p>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">FOR ENQUIRIES</h3>
                  <p className="text-sm">contactus@kifaytihealth.com</p>
                </div>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="mt-8 md:mt-0 md:w-1/2 lg:w-4/12">
              {/* Links Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                {/* Company Section */}
                <div>
                  <h3 className="font-bold mb-4">COMPANY</h3>
                  <ul className="space-y-3">
                    <li><a href="#about" className="text-sm hover:underline">About us</a></li>
                    <li><a href="#contact" className="text-sm hover:underline">Contact us</a></li>
                  </ul>
                </div>
  
                {/* Services Section */}
                <div>
                  <h3 className="font-bold mb-4">SERVICES</h3>
                  <ul className="space-y-3">
                    <li><a href="#patients" className="text-sm hover:underline">For Patients</a></li>
                    <li><a href="#doctors" className="text-sm hover:underline">For Doctors</a></li>
                    <li><a href="#institutions" className="text-sm hover:underline">For Institutions</a></li>
                  </ul>
                </div>
              </div>
  
              {/* Social Media */}
              <div className="mb-8">
                <h3 className="font-bold mb-4">Follow us on Social Media</h3>
                <div className="flex justify-start sm:justify-end space-x-4">
                  <a href="#facebook" className="hover:opacity-80">
                    <img src={fb} alt="Facebook" className="w-8 h-8" />
                  </a>
                  <a href="#instagram" className="hover:opacity-80">
                    <img src={insta} alt="Instagram" className="w-8 h-8" />
                  </a>
                </div>
              </div>
  
              {/* Copyright */}
              <div>
                <p className="text-xs text-center sm:text-right">ALL RIGHTS RESERVED. COPYRIGHT OF KIFAYTI HEALTH PVT. LTD 2024.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  
  }

  // Desktop and Tablet Layout
  return (
    <footer className={`${styles.footer} text-white  py-10 px-4 md:px-8`}>
      <div className="container mx-10 px-4 lg:px-8 xl:px-0 max-w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 lg:space-x-16">
          
          {/* Left Column */}
          <div className="space-y-6 md:w-1/2 lg:w-5/12">
            {/* Logo and Heading */}
            <div className="flex flex-col items-start md:flex-row md:items-center space-y-2 md:space-y-0">
              <img src={kifayti} alt="kifayti logo" className="w-12 h-12" />
              <h2 className="text-3xl md:ml-3 font-semibold">Kifayti Health</h2>
            </div>
          
            {/* Contact Information */}
            <div className="space-y-6 mt-8">
              <div>
                <h3 className="font-bold mb-2">ADDRESS</h3>
                <p className="text-sm max-w-md">8/2, Beratan Agrahara Chikkabegur, Bangalore, Karnataka 560100</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">CUSTOMER SUPPORT</h3>
                <p className="text-sm">+91 98840 40400</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">FOR ENQUIRIES</h3>
                <p className="text-sm">contactus@kifaytihealth.com</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="mt-8 md:mt-0 md:w-1/2 lg:w-4/12 text-right px-11">
            {/* Links Section */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Company Section */}
              <div>
                <h3 className="font-bold mb-4">COMPANY</h3>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-sm hover:underline">About us</a></li>
                  <li><a href="#contact" className="text-sm hover:underline">Contact us</a></li>
                </ul>
              </div>

              {/* Services Section */}
              <div>
                <h3 className="font-bold mb-4">SERVICES</h3>
                <ul className="space-y-3">
                  <li><a href="#patients" className="text-sm hover:underline">For Patients</a></li>
                  <li><a href="#doctors" className="text-sm hover:underline">For Doctors</a></li>
                  <li><a href="#institutions" className="text-sm hover:underline">For Institutions</a></li>
                </ul>
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-8">
              <h3 className="font-bold mb-4">Follow us on Social Media</h3>
              <div className="flex justify-end space-x-4 ">
                <a href="#facebook" className="hover:opacity-80">
                  <img src={fb} alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="#instagram" className="hover:opacity-80">
                  <img src={insta} alt="Instagram" className="w-8 h-8" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-xs">ALL RIGHTS RESERVED. COPYRIGHT OF KIFAYTI HEALTH PVT. LTD 2024.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
