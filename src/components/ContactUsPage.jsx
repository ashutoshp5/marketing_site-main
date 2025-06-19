import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import phone from "../assets/figma images/phone call 1.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ContactUsPage = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "", // Added phone number field
    message: "",
  });

  // State to manage success or error messages
  const [status, setStatus] = useState(null); // Initialize as null

  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    if (status) {
      setStatus(null); // Clear status when user modifies the form
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);   // Start loading

    try {
      // Make a POST request to the backend
      const response = await axios.post(`${API_BASE_URL}/contact/submit`, formData);

      // Handle success response
      setStatus({ type: "success", message: response.data.success });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" }); // Clear the form, including phone
    } catch (error) {
      // Handle error response
      setStatus({
        type: "error",
        message: error.response?.data?.error || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Effect to auto-dismiss status messages after 6 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null); // Clear the status message
      }, 6000); // 6000 milliseconds = 6 seconds

      // Cleanup the timer when component unmounts or when status changes
      return () => clearTimeout(timer);
    }
  }, [status]); // Re-run the effect when 'status' changes

  return (
    <div className="flex flex-col md:flex-row justify-center items-center py-16 md:py-20 px-6 md:px-10 bg-white min-h-screen">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 p-4 md:p-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center md:text-left text-gray-800">
          Contact Us Today
        </h2>
        <p className="text-gray-600 mb-8 text-center md:text-left leading-relaxed">
          Schedule a consultation or request more information about our services. Let's work together to manage CKD effectively and improve your quality of life.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="firstName" className="block text-gray-700 mb-2 font-semibold">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                required // Optional: Add validation
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block text-gray-700 mb-2 font-semibold">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                required // Optional: Add validation
              />
            </div>
          </div>

          {/* New Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2 font-semibold">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
              pattern="[0-9]{10}" // Optional: Add validation pattern
              title="Please enter a valid 10-digit phone number"
              required // Optional: Make the field required
            />
          </div>
          {/* End of Phone Number Field */}

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
              required // Optional: Add validation
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2 font-semibold">
              Your message
            </label>
            <textarea
              id="message"
              placeholder="Enter your question or message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
              rows="4"
              required // Optional: Add validation
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transform hover:-translate-y-1 transition duration-300 flex items-center justify-center ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={loading} // Disable button when loading
            aria-busy={loading} // Accessibility: Indicate busy state
          >
            {loading ? (
              <>
                {/* Spinner */}
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true" // Accessibility: Hide from screen readers
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span className="sr-only">Submitting...</span> {/* Accessible Text */}
                Submitting...
              </>
            ) : (
              "SUBMIT"
            )}
          </button>
        </form>

        {/* Display status message */}
        {status && (
          <p
            role="alert" // Accessibility: Announce to screen readers
            className={`mt-4 text-center font-semibold transition-opacity duration-1000 ${
              status.type === "success"
                ? "text-green-600 opacity-100"
                : "text-red-600 opacity-100"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>

      {/* Right Side: Image with 3D Effect */}
      <div className="w-full md:w-1/2 p-4 flex justify-center items-center mt-10 md:mt-0 relative">
        <div className="relative">
          <img
            src={phone}
            alt="Contact Us"
            className="rounded-lg object-cover max-w-full h-auto md:max-h-[500px] shadow-2xl transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <div className="absolute -inset-2 rounded-lg opacity-0 hover:opacity-100 blur-lg shadow-2xl transition-all duration-300 ease-in-out"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
