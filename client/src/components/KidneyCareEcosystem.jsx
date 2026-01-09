import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import animationData from "../assets/animations/▶-Animation-frame.json";
import { useInView } from "react-intersection-observer";
import animationGit from "../assets/animations/Animation.gif";


gsap.registerPlugin(ScrollTrigger);

const KidneyCareEcosystem = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Changed to true - triggers only once
    threshold: 0.5,
  });

  const lottieRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false); // Track if animation has played
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Create matchMedia instance for desktop only
    const mm = gsap.matchMedia();

    // Only run animations on desktop (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
      // Split and animate left heading section word by word
      const leftHeadings = leftSectionRef.current.querySelectorAll('h1, h2');
      leftHeadings.forEach((heading) => {
        const words = heading.textContent.split(' ');
        heading.innerHTML = words.map(word => `<span class="word" style="display: inline-block;"><span style="display: inline-block;">${word}</span></span>`).join(' ');
      });

      const leftWords = leftSectionRef.current.querySelectorAll('.word span');

      gsap.from(leftWords, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08
      });

      // Split and animate right text section word by word
      const rightParagraphs = rightSectionRef.current.querySelectorAll('p');
      rightParagraphs.forEach((paragraph) => {
        const words = paragraph.textContent.split(' ');
        paragraph.innerHTML = words.map(word => `<span class="word" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`).join(' ');
      });

      const rightWords = rightSectionRef.current.querySelectorAll('.word span');

      gsap.from(rightWords, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.06,
        delay: 0.2
      });

      // Animate center phone with scale and rotation
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        },
        scale: 0.7,
        opacity: 0,
        rotation: 5,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 0.3
      });

      // Add floating animation to phone
      gsap.to(ref.current, {
        y: -10,
        duration: 2.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5
      });
    });

    // Cleanup handled automatically by matchMedia
  }, { scope: containerRef });

  useEffect(() => {
    // Only play animation once when first coming into view
    if (inView && !hasPlayed) {
      setFadeIn(true);
      setHasPlayed(true); // Mark as played

      if (lottieRef.current) {
        lottieRef.current.goToAndStop(0, true);
        setTimeout(() => {
          lottieRef.current.play();
        }, 50);
      }
    }
  }, [inView, hasPlayed]);

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-screen bg-white p-4 md:p-8">

      {/* Left Section - Heading */}
      <div ref={leftSectionRef} className="lg:w-1/3 w-full lg:text-left text-center max-sm:text-left lg:pl-16 mb-8 lg:mb-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
          Kidney Care Ecosystem
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-400 mt-4">
          On Your Fingertips
        </h2>
      </div>

      {/* Center Section - Lottie Animation */}
      <div className="lg:w-1/3 w-full flex justify-center items-center mb-8 lg:mb-0">
        <div ref={ref} className="relative bg-white rounded-3xl">
          <div
            className={`transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"
              } 
  w-48 sm:w-56 md:w-64 lg:w-80
  h-[380px] sm:h-[420px] md:h-[480px] lg:h-[540px]
  overflow-hidden flex items-center justify-center
  bg-white`}  // Add bg-white here
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              autoplay={false}
              loop={false}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              className="w-full h-full object-cover"
              style={{
                pointerEvents: "none",
                background: "white"  // Add inline white background
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Section - Text */}
      <div ref={rightSectionRef} className="lg:w-1/3 w-full lg:text-right text-center mt-8 lg:mt-[300px] px-4 lg:px-0">
        <div className="text-teal-800 max-sm:text-left">
          <p className="text-sm sm:text-base md:text-lg lg:text-lg mb-4">
            A CKD (Stage 1 to Stage 4, dialysis & transplant) patient needs multiple services in their treatment journey.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg">
            We partner with all kidney care stakeholders to create an ecosystem where the patient gets everything under one roof.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KidneyCareEcosystem;
