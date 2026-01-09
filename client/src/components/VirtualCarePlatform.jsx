import React, { memo, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import laptopImage from '../assets/figma images/kifayti_2 1doctorlappy.png';

const VirtualCarePlatform = memo(() => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline with slower, smoother animations
      const tl = gsap.timeline({ 
        defaults: { 
          ease: 'power2.out', // Gentler easing
        } 
      });

      // Animate first line - gentle fade up
      tl.fromTo(
        headingRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5, // Slower
        },
        0.3 // Small delay at start
      );

      // Animate second line - gentle fade up
      tl.fromTo(
        subheadingRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
        },
        0.6 // Stagger slightly
      );

      // Animate scroll indicator - gentle fade in
      tl.fromTo(
        scrollIndicatorRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        },
        '-=0.5'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-14 flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-7xl flex-1 flex items-center">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1
              ref={headingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-900 leading-tight opacity-0"
            >
              Your All-In-One Virtual
              <br />
              Care Platform:
            </h1>
            <h2
              ref={subheadingRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#01C6BD] leading-tight opacity-0"
            >
              Attract, Engage & Treat
              <br />
              More Patients
            </h2>
          </div>

          {/* Image Section - NO ANIMATION, NO REF */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src={laptopImage}
              alt="Virtual Care Platform showing patient management interface"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="mt-8 mb-4 lg:hidden flex justify-center opacity-0"
      >
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
});

VirtualCarePlatform.displayName = 'VirtualCarePlatform';

export default VirtualCarePlatform;