import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "../assets/images/kidney-hero.png";
import treatImg from "../assets/images/treatment-screen.png";
import monitorImg from "../assets/images/mob2.png";
import predictImg from "../assets/images/prediction-screen.png";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { 
    image: heroImg,
    title: "Your Kidney Care",
    subtitle: "on your fingertips", 
    description: "Delivering all kidney care stakeholders in your health journey under one roof.",
    isHero: true
  },
  { 
    image: treatImg,
    title: "Treatment Adherence",
    description: "We help you stay on track with your medications and lifestyle changes, making it easier to follow your treatment plan.",
    isHero: false
  },
  { 
    image: monitorImg,
    title: "Patient Monitoring & Data Analysis", 
    description: "Continuous monitoring, real-time updates & our analytical tools keep you and your healthcare team informed about your health status",
    isHero: false
  },
  { 
    image: predictImg,
    title: "Disease Progression Prediction",
    description: "Our tools predict disease progression, providing timely interventions and better management. Using AI analytics we also identify high risk patients for CKD",
    isHero: false
  },
];

export default function MobileSequenceAnimation() {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const textRefs = useRef([]);
  const screenRefs = useRef([]);
  const dotsRef = useRef([]);
  const mobilePhoneRefs = useRef([]);
  const mobileSectionRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return; // Skip desktop GSAP for mobile

    const ctx = gsap.context(() => {
      /* ---------- HARD INITIAL STATES (CRITICAL) ---------- */
      gsap.set(phoneRef.current, { x: "80%", rotation: 22 });
      gsap.set(textRefs.current, { opacity: 0, y: 80 });
      gsap.set(screenRefs.current, { opacity: 0, scale: 0.95 });
      gsap.set(dotsRef.current, { opacity: 0.4, scale: 0.7 });
      gsap.set(dotsRef.current[0], { opacity: 1, scale: 1.2 });
      gsap.set(textRefs.current[0], { opacity: 1, y: 0 });
      gsap.set(screenRefs.current[0], { opacity: 1, scale: 1 });

      /* ---------- TIMELINE ---------- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
        },
      });

      const SECTION = 1;

      sections.forEach((_, i) => {
        const at = i * SECTION;

        // DOT ACTIVE STATE
        tl.to(dotsRef.current, { opacity: 0.4, scale: 0.7, duration: 0.1 }, at);
        tl.to(dotsRef.current[i], { opacity: 1, scale: 1.2, duration: 0.2 }, at);

        /* PHONE */
        if (i === 1) tl.to(phoneRef.current, { x: "-100%", rotation: 0 }, at);
        if (i === 2) tl.to(phoneRef.current, { x: "0%" }, at);
        if (i === 3) tl.to(phoneRef.current, { x: "100%" }, at);

        /* TEXT IN */
        if (i !== 0) {
          tl.to(textRefs.current[i], { opacity: 1, y: 0, duration: 0.35 }, at + 0.15);
        }

        /* TEXT OUT (OVERLAP – NO WHITE GAP) */
        if (i > 0) {
          tl.to(textRefs.current[i - 1], { opacity: 0, y: -80, duration: 0.3 }, at + 0.15);
        }

        /* SCREEN IN */
        if (i !== 0) {
          tl.to(screenRefs.current[i], { opacity: 1, scale: 1, duration: 0.3 }, at + 0.2);
        }

        // CKD HEADER VISIBILITY
        if (i === 1) {
          tl.to(textRefs.current[4], { opacity: 1, duration: 0.3 }, at);
        }
        if (i === 0) {
          tl.set(textRefs.current[4], { opacity: 0 }, at);
        }

        /* SCREEN OUT */
        if (i > 0) {
          tl.to(screenRefs.current[i - 1], { opacity: 0, scale: 0.95, duration: 0.25 }, at + 0.35);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile Animation
  useLayoutEffect(() => {
    if (!isMobile) return; // Skip mobile GSAP for desktop

    const ctx = gsap.context(() => {
      // Set initial state for all phones
      mobilePhoneRefs.current.forEach((phone, i) => {
        if (phone) {
          gsap.set(phone, { 
            x: 0,
            rotation: i === 0 ? 12 : 0, // Hero section tilted, others straight
            transformOrigin: "center center"
          });
        }
      });

      // Create scroll-triggered animations for each section
      sections.forEach((_, i) => {
        if (!mobilePhoneRefs.current[i] || !mobileSectionRefs.current[i]) return;

        let targetX = 0;
        let targetRotation = 0;
        
        if (i === 0) {
          targetX = 0; // center for hero
          targetRotation = 12; // tilted for hero
        } else if (i === 1) {
          targetX = -60; // move left
          targetRotation = 0;
        } else if (i === 2) {
          targetX = 0; // back to center
          targetRotation = 0;
        } else if (i === 3) {
          targetX = 60; // move right
          targetRotation = 0;
        }

        // Create timeline for each section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileSectionRefs.current[i],
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(mobilePhoneRefs.current[i], {
                x: targetX * progress,
                rotation: i === 0 ? (12 + (targetRotation - 12) * progress) : targetRotation * progress,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          }
        });

        // Add phone movement animation
        tl.to(mobilePhoneRefs.current[i], {
          x: targetX,
          rotation: targetRotation,
          duration: 1,
          ease: "power2.inOut"
        });
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="bg-white">
        {sections.map((section, index) => (
          <div 
            key={index} 
            ref={(el) => (mobileSectionRefs.current[index] = el)}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-8 relative"
          >
            {/* Header for non-hero sections */}
            {!section.isHero && (
              <div className="top-8 left-0 px-3 right-0 z-20">
                <div className=" mb-4">
                  <h3 className="text-xl font-bold">
                    Your <span className="text-[#01C6BD]">CKD partner</span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 max-w-sm mx-auto">
                    We are partnering with all kidney care stakeholders to create an ecosystem where the patient gets everything under one roof.
                  </p>
                </div>
              </div>
            )}

            {/* Hero section - all content above phone */}
            {section.isHero && (
              <div className="pt-12 mb-8 relative z-20">
                <h1 className="text-3xl font-bold mb-4">
                  {section.title} <br />
                  <span className="text-[#01C6BD]">{section.subtitle}</span>
                </h1>
                <p className="text-gray-600 text-base mb-6 max-w-sm mx-auto">
                  {section.description}
                </p>
                <button
                  className="bg-[#FF4A2F] text-white py-3 px-6 font-medium inline-flex items-center justify-center gap-2 hover:bg-[#e63d24] transition-colors duration-300 mb-8"
                >
                  <span>Learn</span>
                  <span className="text-2xl mb-0.5 leading-none" aria-hidden="true">»</span>
                </button>
              </div>
            )}

            {/* Phone mockup */}
            <div className="flex-1 flex items-center py-4 justify-center relative w-full">
              <div 
                ref={(el) => (mobilePhoneRefs.current[index] = el)}
                className="relative w-48 aspect-[9/19] will-change-transform"
              >
                <img
                  src="/mobile frame.png"
                  className="absolute inset-0 z-10 w-full h-full object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
                  }}
                  alt="Mobile frame"
                />
                <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                  <img
                    src={section.image}
                    className="w-[85%] h-full object-contain"
                    alt={`Section ${index + 1}`}
                  />
                </div>
              </div>
            </div>

            {/* Text content for non-hero sections */}
            {!section.isHero && (
              <div className="px-4 pb-8 relative z-20">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-[#FF4A2F]">{section.title}</span>
                </h2>
                <p className="text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
                  {section.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Desktop Layout (existing animation)
  return (
    <div ref={containerRef} className="relative h-screen bg-white overflow-hidden">
      {/* TEXT */}
      <div className="absolute inset-0 z-10 flex items-center px-24">
        <div ref={(el) => (textRefs.current[0] = el)} className="absolute w-[45%] left-24">
          <h1 className="text-6xl font-bold">
            Your Kidney Care <br />
            <span className="text-[#01C6BD]">On Your <br /> Fingertips</span>
          </h1>
          <p className="mt-6 pb-4 text-gray-600">
            Delivering all kidney care stakeholders in your health <br /> journey under one roof.
          </p>
          <button
            aria-label="Learn"
            className="bg-[#FF4A2F] text-white py-2.5 px-6 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-[#e63d24] transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap"
          >
            <span>Learn</span>
            <span className="text-2xl mb-0.5 leading-none" aria-hidden="true">»</span>
          </button>
        </div>

        {/* CKD TOP HEADER (visible for section 1+) */}
        <div ref={(el) => (textRefs.current[4] = el)} className="absolute top-2 left-20 right-20 z-30 opacity-0">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold">
              Your <span className="text-[#01C6BD]">CKD Partner</span>
            </h2>
            <p className="max-w-md text-sm text-gray-600 text-right leading-relaxed">
              We are partnering with all kidney care stakeholders to create an ecosystem
              where the patient gets everything under one roof.
            </p>
          </div>
        </div>

        <div ref={(el) => (textRefs.current[1] = el)} className="absolute w-[45%] right-24">
          <h2 className="text-5xl font-bold">
            Treatment <span className="text-red-500">Adherence</span>
          </h2>
          <p className="mt-6 text-gray-600">
            We help you stay on track with your medications and <br /> lifestyle changes, making it easier to follow your treatment plan.
          </p>
        </div>

        <div ref={(el) => (textRefs.current[2] = el)} className="absolute inset-0 flex items-center px-24">
          <div className="w-[30%]">
            <h2 className="text-5xl font-bold">
              Patient Monitoring &<br />
              <span className="text-red-500">Data Analysis</span>
            </h2>
          </div>
          <div className="w-[40%]" />
          <div className="w-[30%] text-gray-600">
            Continuous monitoring, real-time updates & our analytical tools keep you and your healthcare team informed about your health status
          </div>
        </div>

        <div ref={(el) => (textRefs.current[3] = el)} className="absolute w-[45%] left-24">
          <h2 className="text-5xl font-bold">
            Disease <br />
            <span className="text-red-500">Progression Prediction</span>
          </h2>
          <p className="mt-6 text-gray-600">
            Our tools predict disease progression, providing timely <br /> interventions and better management. Using AI analytics we <br /> also identify high risk patients for CKD
          </p>
        </div>
      </div>

      {/* SECTION DOTS */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {sections.map((_, i) => (
          <div
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="w-2.5 h-2.5 rounded-full bg-[#FF4A2F] opacity-40"
          />
        ))}
      </div>

      {/* PHONE */}
      <div className="absolute inset-0 z-50 shadow-lg pt-20 flex items-center justify-center pointer-events-none">
        <div ref={phoneRef} className="relative w-40 sm:w-48 md:w-56 lg:w-64 aspect-[9/15]">
          <img
            src="/mobile frame.png"
            className="absolute inset-0 z-10 w-full h-full object-contain"
            alt=""
          />
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            {sections.map((s, i) => (
              <img
                key={i}
                ref={(el) => (screenRefs.current[i] = el)}
                src={s.image}
                className="absolute w-[195px] rounded-sm h-full object-contain"
                alt=""
              />
            ))}
          </div>
        </div>
      </div>      
    </div>
  );
}
