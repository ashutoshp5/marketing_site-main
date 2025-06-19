import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Testimonials = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRedirect = () => {
    navigate('/contact'); // Redirect to the Contact page
  };
  const testimonials = [
    {
      text: "One or two liner from the patient regarding the platform or their experience comes here.",
      name: "NAME OR DISEASE",
      location: "BENGALURU",
    },
    {
      text: "One or two liner from the patient regarding the platform or their experience comes here.",
      name: "NAME OR DISEASE",
      location: "BENGALURU",
    },
    {
      text: "One or two liner from the patient regarding the platform or their experience comes here.",
      name: "NAME OR DISEASE",
      location: "BENGALURU",
    },
    {
      text: "One or two liner from the patient regarding the platform or their experience comes here.",
      name: "NAME OR DISEASE",
      location: "Mumbai",
    },
    {
      text: "One or two liner from the patient regarding the platform or their experience comes here.",
      name: "NAME OR DISEASE",
      location: "Kolkata",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black">
            What Are People <br /> Saying About Us
          </h2>
          <div className="text-center lg:text-right">
            <button onClick={handleRedirect} className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300 w-full lg:w-auto hover:shadow-xl transform hover:-translate-y-0.5">
              Request Callback &rarr;
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="mt-12">
          <Slider {...sliderSettings} className="testimonial-slider">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-2 mb-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left h-full mx-2 flex flex-col justify-between relative overflow-hidden group">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-12 -mt-12 transition-transform duration-300 group-hover:scale-110"></div>
                  
                  <div className="relative">
                    {/* Quote Icon with enhanced styling */}
                    <div className="mb-6 relative">
                      <div className="absolute -left-2 -top-2 w-12 h-12 bg-teal-50 rounded-full"></div>
                      <svg
                        className="w-8 h-8 text-teal-600 relative z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    {/* Testimonial Text with enhanced typography */}
                    <p className="text-gray-700 text-lg font-medium mb-6 leading-relaxed relative z-10">
                      "{testimonial.text}"
                    </p>
                  </div>
                  
                  {/* Testimonial Author Info with enhanced styling */}
                  <div className="relative z-10 border-t pt-4 mt-4 border-gray-100">
                    <p className="font-bold text-teal-600 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-teal-500 font-medium">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Enhanced slider styles */}
      <style jsx>{`
        .testimonial-slider .slick-slide > div {
          margin: 0 15px;
        }
        .testimonial-slider {
          margin: 0 -15px;
        }
        .testimonial-slider .slick-dots li button:before {
          font-size: 12px;
          color: #0D9488;
          opacity: 0.5;
        }
        .testimonial-slider .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #0D9488;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;