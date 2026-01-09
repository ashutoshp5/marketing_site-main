import { memo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import kidneyImage1 from '../assets/figma images/Kidney 3.png';
import kidneyImage2 from '../assets/figma images/Kidney 4.png';

const HomeSection = memo(() => {
  const leftKidneyRef = useRef(null);
  const rightKidneyRef = useRef(null);
  const centerTextRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Only run animations on desktop (md breakpoint and above)
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    if (mediaQuery.matches) {
      // Animate left kidney from left with rotation
      gsap.from(leftKidneyRef.current, {
        x: -200,
        opacity: 0,
        rotation: -15,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });

      // Animate right kidney from right with rotation
      gsap.from(rightKidneyRef.current, {
        x: 200,
        opacity: 0,
        rotation: 15,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });

      // Animate center text with smooth fade and slide up
      gsap.from(centerTextRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.6
      });

      // Add floating animation to kidney images
      gsap.to([leftKidneyRef.current, rightKidneyRef.current], {
        y: -15,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.5
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white flex items-center w-full overflow-x-hidden">
      <div className="w-full max-w-full px-0 md:px-6 lg:px-8">

        {/* Mobile Layout - Single Column (No Animations) */}
        <div className="md:hidden min-h-screen flex flex-col items-center gap-6 py-20 w-full">
          <div className="flex justify-center w-full">
            <img 
              src={kidneyImage2} 
              alt="Detailed kidney anatomical cross-section showing internal structure" 
              loading="lazy"
              width="800"
              height="600"
              className="w-full h-auto max-w-full object-contain" 
            />
          </div>

          <div className="flex justify-start text-start w-full px-8">
            <div>
              <h1 className="font-bold text-gray-900 mb-4 leading-tight">
                <span className="block text-4xl sm:text-4xl mb-1">Your Trusted Partner in</span>              
                <span className="block text-4xl sm:text-4xl text-[#01C6BD]">Kidney Care</span>
              </h1>

              <p className="text-md sm:text-base text-gray-600 leading-relaxed mt-4">
                A Compassionate Approach To Managing{' '}
                <span className="font-semibold text-teal-700">Chronic Kidney Disease</span>
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Three Columns (With Animations) */}
        <div className="hidden md:flex min-h-screen items-center">
          
          {/* Left Kidney Image */}
          <div ref={leftKidneyRef} className="flex justify-end">
            <img 
              src={kidneyImage1} 
              alt="Left kidney anatomical illustration with vascular system" 
              loading="lazy"
              width="1100"
              height="800"
              className="w-full h-auto max-w-[650px] lg:max-w-[800px] xl:max-w-[950px] 2xl:max-w-[1100px] object-contain" 
            />
          </div>

          {/* Center Text */}
          <div ref={centerTextRef} className="text-center flex-shrink-0 px-6 lg:px-12">
            <h1 className="hero-title font-bold text-gray-900 mb-6 leading-tight">
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-1">Your Trusted</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-1">Partner in</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#01C6BD]">Kidney Care</span>
            </h1>

            <p className="hero-subtitle text-base lg:text-lg text-gray-600 leading-relaxed mt-6">
              A Compassionate Approach To Managing
              <br />
              <span className="font-bold text-teal-700">Chronic Kidney Disease</span>
            </p>
          </div>

          {/* Right Kidney Image */}
          <div ref={rightKidneyRef} className="flex justify-start">
            <img 
              src={kidneyImage2} 
              alt="Right kidney anatomical illustration with internal detail"               
              loading="lazy"
              width="1100"
              height="800"
              className="w-full h-auto max-w-[650px] lg:max-w-[800px] xl:max-w-[950px] 2xl:max-w-[1100px] object-contain" 
            />
          </div>
        </div>

      </div>
    </div>
  );
});

HomeSection.displayName = 'HomeSection';

export default HomeSection;
