import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/figma images/logo 1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'DOCTORS', path: '/doctors' },
    { name: 'PATIENTS', path: '/patients' },
    { name: 'BLOG', path: '/blogs' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT US', path: '/contact' },
  ];

  return (
    <>
      <nav className="bg-white bg-opacity-30 backdrop-blur-lg fixed w-full z-20">
        <div className="w-full px-0 md:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="text-xl sm:text-2xl font-bold text-teal-800 flex items-center px-3 sm:px-4">
            <img
              src={logo}
              alt="Kifayti Health Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 mr-2"
            />
            <span className="hidden sm:inline">Kifayti Health</span>
            <span className="sm:hidden">Kifayti</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 px-3 sm:px-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm xl:text-base text-teal-800 tracking-wider hover:text-red-500 transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'border-b-4 border-red-500 text-orange-700' 
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="lg:hidden text-teal-800 focus:outline-none p-2 hover:bg-teal-50 rounded-lg transition-colors mr-3 sm:mr-4"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay with fade animation */}
      <div 
        className={`fixed inset-0 bg-black z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMenu}
      />

      {/* Professional Sliding Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-teal-50 to-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Section with Close Button */}
        <div className="bg-teal-700 text-white px-6 py-6 relative">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white hover:text-red-300 focus:outline-none p-2 rounded-full hover:bg-teal-800 transition-all duration-200"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          {/* Logo and Brand */}
          <div className="flex items-center mt-2">
            <img
              src={logo}
              alt="Kifayti Health Logo"
              className="w-14 h-14 mr-3 bg-white rounded-full p-2"
            />
            <div>
              <h2 className="text-xl font-bold">Kifayti Health</h2>
              <p className="text-teal-200 text-sm">Healthcare Solutions</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`group flex items-center justify-between text-base font-medium px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                location.pathname === item.path 
                  ? 'bg-teal-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-teal-100 hover:text-teal-800'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span>{item.name}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  location.pathname === item.path ? 'translate-x-1' : 'group-hover:translate-x-1'
                }`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            © 2025 Kifayti Health
          </p>
          <p className="text-xs text-gray-500 text-center mt-1">
            Quality Healthcare for All
          </p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
