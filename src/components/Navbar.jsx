import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/figma images/logo 1.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current location

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Patients', path: '/patients' },
    { name: 'Blog', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white bg-opacity-30 backdrop-blur-lg shadow-lg fixed w-full  z-20">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-teal-800 flex items-center">
          {/* Include a logo image or icon if necessary */}
          <img
            src={logo} // Replace with your logo image
            alt="Kifayti Health Logo"
            className="w-10 h-10 mr-2"
          />
          Kifayti Health
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-teal-800 hover:text-red-500 font-semibold transition-colors ${
                location.pathname === item.path ? 'border-b-4 border-red-500 text-red-500 font-bold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white bg-opacity-30 backdrop-blur-lg shadow-lg z-10">
          <div className="flex flex-col justify-center items-center px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // Close menu on selection
                className={`text-teal-800 hover:text-red-500 font-semibold transition-colors ${
                  location.pathname === item.path ? 'border-b-4 border-red-500 text-red-500 font-bold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
