const ContactUs = () => {
  return (
    <div className="bg-white max-sm:text-left text-center py-12 px-4 md:px-10 lg:px-20">
      {/* Heading 2 - Join Us On */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        Join Us On
      </h2>

      {/* Heading 1 - The Path To Better Health */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
        The Path To Better Health
      </h1>

      {/* Description Paragraph */}
      <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
        At Kifayti Health, we are dedicated to transforming kidney care and
        empowering <br className="hidden md:block" />
        patients. Join our community and take the first step towards a
        healthier, more <br className="hidden md:block" />
        vibrant life.
      </p>

      {/* Input and Button Wrapper */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-8 mb-20 space-y-4 md:space-y-0 md:space-x-4">
        {/* Email Input Field */}
        <div className="flex items-center bg-white shadow-[0px_1.5px_20px_rgba(0,0,0,0.2)] rounded-md overflow-hidden w-full md:w-auto">
          {/* Icon */}
          <div className="px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a1 1 0 001.22 0L20 8m-17 0v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8l7.39-4.74a2 2 0 012.22 0L20 8"
              />
            </svg>
          </div>

          {/* Email Input */}
          <input
            type="email"
            placeholder="youremail123@gmail.com"
            className="bg-white w-full md:w-[320px] lg:w-[440px] p-4 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Subscribe Button */}
        <button className="bg-red-500 text-white px-8 py-[9.5px] rounded-md shadow-lg w-full md:w-auto hover:bg-red-600 transition-colors duration-300">
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
