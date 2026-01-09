import React from 'react';
import insta from "../assets/figma images/Instagram.png";
import fb from "../assets/figma images/Facebook.png";
import kifayti from "../assets/figma images/kifaytifooterlogo 1.png";
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={`${styles.footer} text-white py-8 sm:py-10 lg:py-12 px-6 sm:px-8 lg:px-16 xl:px-20`}>
      <div className="container mx-auto max-w-7xl">
        {/* Logo and Heading - Always at top */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">

          {/* Left Column - Contact Info */}
          <div className="space-y-6 lg:space-y-7 lg:w-5/12">
            <div className="flex items-center space-x-3 mb-8 lg:mb-10">
              <img src={kifayti} alt="kifayti logo" className="w-10 h-10 sm:w-12 sm:h-12" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Kifayti Health</h2>
            </div>
            {/* Address */}
            <div>
              <h3 className="font-bold text-xs sm:text-sm mb-2 tracking-wider">ADDRESS</h3>
              <p className="text-sm lg:text-base leading-relaxed">
                8/2, Beratan Agrahara Chikkabegur, Bangalore, Karnataka 560100
              </p>
            </div>

            {/* Customer Support */}
            <div>
              <h3 className="font-bold text-xs sm:text-sm mb-2 tracking-wider">CUSTOMER SUPPORT</h3>
              <p className="text-sm lg:text-base">+91 98840 40400</p>
            </div>

            {/* Enquiries */}
            <div>
              <h3 className="font-bold text-xs sm:text-sm mb-2 tracking-wider">FOR ENQUIRIES</h3>
              <p className="text-sm lg:text-base">contactus@kifaytihealth.com</p>
            </div>
          </div>

          {/* Right Column - Links, Social & Copyright */}
          <div className="mt-10 lg:mt-0 lg:w-6/12 flex flex-col lg:items-end">
            {/* Services and Company Links - Side by Side */}
            <div className="grid grid-cols-2 gap-8 lg:gap-16 mb-10 w-full lg:w-auto">
              {/* Company Section */}
              <div className="lg:text-left">
                <h3 className="font-bold text-xs sm:text-sm mb-4 tracking-wider">COMPANY</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/about" className="text-sm lg:text-base hover:underline transition-all">
                      About us
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-sm lg:text-base hover:underline transition-all">
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Services Section */}
              <div className="lg:text-left">
                <h3 className="font-bold text-xs sm:text-sm mb-4 tracking-wider">SERVICES</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/patients" className="text-sm lg:text-base hover:underline transition-all">
                      For Patients
                    </a>
                  </li>
                  <li>
                    <a href="/doctors" className="text-sm lg:text-base hover:underline transition-all">
                      For Doctors
                    </a>
                  </li>
                  <li>
                    <a href="/institutions" className="text-sm lg:text-base hover:underline transition-all">
                      For Institutions
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-8 lg:mb-10 lg:text-right w-full">
              <h3 className="font-bold text-xs sm:text-sm mb-4 tracking-wider">Follow us on Social media</h3>
              <div className="flex space-x-4 lg:justify-end">
                <a href="#facebook" className="hover:opacity-70 transition-opacity">
                  <img src={fb} alt="Facebook" className="w-8 h-8 lg:w-9 lg:h-9" />
                </a>
                <a href="#instagram" className="hover:opacity-70 transition-opacity">
                  <img src={insta} alt="Instagram" className="w-8 h-8 lg:w-9 lg:h-9" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="lg:text-right w-full">
              <p className="text-[10px] sm:text-[11px] leading-relaxed">
                ALL RIGHTS RESERVED. COPYRIGHT OF KIFAYTI HEALTH PVT. LTD 2024.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
