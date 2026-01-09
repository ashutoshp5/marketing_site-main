import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import image1 from '../assets/images/2nd.png';
import image2 from '../assets/images/3rd.png';
import image3 from '../assets/images/4th.png';
import image4 from '../assets/images/5th.png';
import image5 from '../assets/images/6th.png';

gsap.registerPlugin(ScrollTrigger);

const SEQUENCES = [
  {
    text: {
      line1: "Take Advantage Of",
      line2: "Real-World Insights & Evidence",
    },
    image: image1,
  },
  {
    text: {
      line1: "Real-Time",
      line2: "Escalation Pathways And Alert Messages",
      line3: "For Enhanced Decision Making",
    },
    image: image2,
  },
  {
    text: {
      line1: "Enable",
      line2: "Personalized, Just-In-Time Interventions",
    },
    image: image3,
  },
  {
    text: {
      line1: "Secure,",
      line2: "Important Conversations",
      line3: "Between Patients And Healthcare Teams All At One Place",
    },
    image: image4,
  },
  {
    text: {
      line1: "Enhanced Decision Making Powered By",
      line2: "AI/ML & Analytics",
    },
    image: image5,
  },
];

const SequenceAnimation = () => {
  const containerRef = useRef(null);
  const monitorRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    
    // Check if mobile
    const isMobile = window.innerWidth < 1024;
    
    const playBounceForImage = (imageIndex) => {
      if (imageIndex === null || imageIndex === undefined) return;
      const imgEl = container.querySelector(`[data-image="${imageIndex}"] img`);
      if (!imgEl) return;

      gsap.killTweensOf(imgEl);
      gsap.fromTo(
        imgEl,
        { y: 18, scale: 0.94, transformOrigin: 'center center' },
        {
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'back.out(2.0)',
          overwrite: true,
        }
      );
    };

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${(SEQUENCES.length + 1) * 100}%`,
        pin: monitorRef.current,
        pinSpacing: true,
        scrub: isMobile ? 1 : 1.5,
        snap: {
          snapTo: 1 / (SEQUENCES.length + 1),
          duration: { min: 0.2, max: 0.5 },
          ease: 'power1.inOut',
          delay: isMobile ? 0.3 : 0.6,
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const totalSections = SEQUENCES.length + 1;
          const rawSection = Math.floor(progress * totalSections);
          const currentSection = Math.min(rawSection, totalSections - 1);

          setActiveSection(currentSection);
        },
      },
    });

    const firstImage = container.querySelector('[data-image="0"]');
    const firstText = container.querySelector('[data-text="0"]');

    // Text slides from LEFT
    mainTimeline.fromTo(
      firstText,
      { x: isMobile ? -300 : -600, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1,
        ease: 'power3.out'
      },
      0
    );

    // First image: Fade + Scale (ORIGINAL ANIMATION)
    mainTimeline.fromTo(
      firstImage,
      { 
        opacity: 0, 
        scale: isMobile ? 0.95 : 0.98,
      },
      { 
        opacity: 1, 
        scale: 1,
        duration: 1,
        ease: 'power2.in' 
      },
      0.5
    );

    // Bounce exactly when the first image becomes visible (only when scrolling down).
    mainTimeline.call(
      () => {
        const st = mainTimeline.scrollTrigger;
        if (st && st.direction === 1) playBounceForImage(0);
      },
      null,
      0.5
    );

    // SCROLL 2: Nothing happens
    mainTimeline.to({}, { duration: 1 }, 1);

    // SCROLL 3+: Fade with slide up (same as text)
    for (let index = 1; index < SEQUENCES.length; index++) {
      const imageEl = container.querySelector(`[data-image="${index}"]`);
      const textEl = container.querySelector(`[data-text="${index}"]`);
      const prevImageEl = container.querySelector(`[data-image="${index - 1}"]`);
      const prevTextEl = container.querySelector(`[data-text="${index - 1}"]`);

      if (imageEl && textEl && prevImageEl && prevTextEl) {
        const timelinePosition = index + 1;

        // Fade out previous image (slide up)
        mainTimeline.to(
          prevImageEl,
          {
            opacity: 0,
            y: -2,
            duration: 0.5,
            ease: 'power2.in',
          },
          timelinePosition
        );

        // Fade out previous text (slide up)
        mainTimeline.to(
          prevTextEl,
          {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.in',
          },
          timelinePosition
        );

        // Fade in new image (slide from bottom)
        const isLastImage = index === SEQUENCES.length - 1;
        mainTimeline.fromTo(
          imageEl,
          isLastImage
            ? {
                opacity: 0,
                x: 0,
                y: isMobile ? 35 : 50,
                rotate: isMobile ? -10 : -14,
                transformOrigin: 'center center',
              }
            : {
                opacity: 0,
                y: isMobile ? 30 : 40,
              },
          isLastImage
            ? {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                duration: 1,
                ease: 'power3.out',
              }
            : {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
              },
          timelinePosition + 0.3
        );

        // Bounce at the same moment the new image fades in (only when scrolling down).
        mainTimeline.call(
          () => {
            const st = mainTimeline.scrollTrigger;
            if (st && st.direction === 1) playBounceForImage(index);
          },
          null,
          timelinePosition + 0.3
        );

        // Fade in new text (slide from bottom)
        mainTimeline.fromTo(
          textEl,
          { 
            opacity: 0, 
            y: isMobile ? 30 : 40 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          timelinePosition + 0.3
        );
      }
    }

    // Refresh on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* How Do We Assist Section */}
      <div className="container mx-auto max-w-6xl sm:py-12 md:py-16 lg:py-2">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6 lg:gap-12 px-6 sm:px-6 lg:px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
            How Do We <span className="text-teal-500">Assist You?</span>
          </h2>

          <div className="text-left lg:text-right max-w-xl">
            <p className="text-sm sm:text-base md:text-lg text-teal-800 leading-relaxed">
              We take care of all your IT infrastructure, patient engagement & outcome, data management & compliance needs so you can focus on what matters the most, <strong>your patient</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Animation Container */}
      <div ref={containerRef} className="relative bg-white">
        {/* Pinned Monitor Section */}
        <div
          ref={monitorRef}
          className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-10 py-8 sm:py-12 lg:py-0"
        >
          <div className="max-w-7xl w-full mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
              {/* Monitor with Images */}
              <div className="relative w-full sm:w-4/5 md:w-3/4 lg:w-[45%] max-w-2xl">
                {/* Monitor Frame */}
                <img
                  src="/desktopframe.png"
                  className="relative z-10 w-full h-auto"
                  alt="Desktop frame"
                />
                
                {/* Monitor Content Area */}
                <div
                  className="absolute overflow-hidden rounded-sm"
                  style={{ 
                    top: '0%', 
                    left: '3%', 
                    right: '3%', 
                    bottom: '15%',
                  }}
                >
                  {SEQUENCES.map((seq, index) => (
                    <div
                      key={`img-${index}`}
                      data-image={index}
                      className="absolute inset-0"
                      style={{ 
                        opacity: 0,
                        transform: index === 0 ? 'scale(0.9)' : 'translateY(40px)',
                      }}
                    >
                      <img
                        src={seq.image}
                        alt={`${seq.text.line1} ${seq.text.line2}`}
                        className="w-full h-full object-contain"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div className="relative w-full lg:w-[50%] min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] flex items-center justify-center lg:justify-start">
                {SEQUENCES.map((seq, index) => (
                  <div
                    key={`text-${index}`}
                    data-text={index}
                    className="absolute inset-0 flex items-center px-2 sm:px-4"
                    style={{ 
                      opacity: 0,
                      transform: index === 0 ? 'translateX(-300px)' : 'translateY(40px)',
                    }}
                  >
                    <div className="text-center max-sm:text-left lg:text-left w-full">
                      <h2 className="text-2xl sm:text-4xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight">
                        {seq.text.line1 && (
                          <span className="block text-black mb-1 sm:mb-2">
                            {seq.text.line1}
                          </span>
                        )}
                        {seq.text.line2 && (
                          <span className="block text-red-500">
                            {seq.text.line2}
                          </span>
                        )}
                        {seq.text.line3 && (
                          <span className="block text-black mt-1 sm:mt-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal">
                            {seq.text.line3}
                          </span>
                        )}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Indicators - Desktop */}
            <div className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 flex-col gap-3 xl:gap-4 z-20">
              {[...Array(SEQUENCES.length + 1)].map((_, index) => (
                <button
                  key={`indicator-${index}`}
                  className={`w-2 h-6 xl:h-8 rounded-full transition-all duration-300 ease-out focus:outline-none ${
                    index === activeSection 
                      ? 'bg-red-500 scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Progress Dots */}
            <div className="flex lg:hidden justify-center mt-6 sm:mt-8 gap-2">
              {[...Array(SEQUENCES.length + 1)].map((_, index) => (
                <div
                  key={`dot-${index}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ease-out ${
                    index === activeSection 
                      ? 'bg-red-500 scale-125' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SequenceAnimation;
