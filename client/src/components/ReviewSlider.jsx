import { memo, useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getApiBaseUrl } from '../lib/apiBase';

const Testimonials = memo(() => {
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = useMemo(() => {
    const API_BASE_URL = getApiBaseUrl();
    return API_BASE_URL ? `${API_BASE_URL}/testimonials` : '';
  }, []);

  const handleRedirect = () => {
    navigate('/contact');
  };

  useEffect(() => {
    let cancelled = false;

    const fetchTestimonials = async () => {
      setLoading(true);
      setError('');

      try {
        if (!apiUrl) throw new Error('Missing VITE_API_URL');
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          throw new Error(`Failed to fetch testimonials (HTTP ${response.status}) ${body}`.trim());
        }

        const data = await response.json();
        if (cancelled) return;
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (err) {
        if (cancelled) return;
        setError(err?.message || 'Failed to fetch testimonials');
        setTestimonials([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTestimonials();
    return () => {
      cancelled = true;
    };
  }, [apiUrl]);

  const sliderSettings = useMemo(() => {
    const count = Array.isArray(testimonials) ? testimonials.length : 0;
    const desktopSlides = Math.min(3, Math.max(1, count || 1));
    const tabletSlides = Math.min(2, desktopSlides);

    const canLoopDesktop = count > desktopSlides;
    const canAutoplay = count > 1;

    return {
      dots: count > 1,
      infinite: canLoopDesktop,
      speed: 500,
      slidesToShow: desktopSlides,
      slidesToScroll: 1,
      autoplay: canAutoplay,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: Math.min(tabletSlides, Math.max(1, count || 1)),
            infinite: count > Math.min(tabletSlides, Math.max(1, count || 1)),
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            infinite: count > 1,
          },
        },
      ],
    };
  }, [testimonials]);

  return (
    <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black text-left">
            What Are People <br className='max-sm:hidden' /> Saying About Us
          </h2>
          <button
            onClick={handleRedirect}
            aria-label="Request callback"
            className="bg-[#367793] text-white py-2.5 px-6 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-[#154552] transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap"
          >
            <span>Request callback</span>
            <span className="text-2xl mb-0.5 leading-none" aria-hidden="true">»</span>
          </button>
        </div>

        {/* Testimonials Slider */}
        <div className="mt-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
              <span className="ml-3 text-gray-600">Loading testimonials...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No testimonials yet.
            </div>
          ) : (
            <Slider {...sliderSettings} className="testimonial-slider">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id || testimonial.id} className="px-2 mb-8">
                  <article className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left h-full mx-2 flex flex-col justify-between relative overflow-hidden group">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-full -mr-12 -mt-12 transition-transform duration-300 group-hover:scale-110" aria-hidden="true"></div>

                    <div className="relative">
                      {/* Quote Icon */}
                      <div className="mb-6 relative">
                        <div className="absolute -left-2 -top-2 w-12 h-12 bg-teal-50 rounded-full" aria-hidden="true"></div>
                        <svg
                          className="w-8 h-8 text-teal-600 relative z-10"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-base md:text-lg font-medium mb-6 leading-relaxed relative z-10">
                        &quot;{testimonial.text}&quot;
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="relative z-10 border-t pt-4 mt-4 border-gray-100">
                      <p className="font-bold text-teal-600 text-base md:text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-teal-500 font-medium text-sm md:text-base">
                        {testimonial.location}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      {/* Slider styles */}
      <style>{`
        .testimonial-slider .slick-slide > div {
          margin: 0 15px;
        }
        .testimonial-slider {
          margin: 0 -15px;
        }
        .testimonial-slider .slick-dots {
          bottom: -40px;
        }
        .testimonial-slider .slick-dots li button:before {
          font-size: 12px;
          color: #0D9488;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .testimonial-slider .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #0D9488;
          transform: scale(1.2);
        }
        .testimonial-slider .slick-dots li button:hover:before {
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;
