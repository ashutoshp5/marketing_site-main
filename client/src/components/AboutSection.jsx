import React from 'react';

const AboutSection = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Open Roles</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque erat purus,
          molestie sit amet ligula non, suscipit ornare velit. Duis interdum sed nibh.
        </p>
      </div>

      {/* Roles Section */}
      <div className="space-y-6">
        {/* First Career Option */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-4">
          <div>
            <h2 className="font-semibold text-lg">Career Option 1</h2>
            <p className="text-gray-600">Open position in this team</p>
          </div>
          <div className="flex space-x-8">
            <span className="text-gray-500">Location</span>
            <span className="text-gray-500">Department</span>
          </div>
        </div>

        {/* Second Career Option */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-4">
          <div>
            <h2 className="font-semibold text-lg">Career Option 1</h2>
            <p className="text-gray-600">Open position in this team</p>
          </div>
          <div className="flex space-x-8">
            <span className="text-gray-500">Location</span>
            <span className="text-gray-500">Department</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center mt-8">
        <span className="text-gray-600">Don’t find what you are looking for?</span>
        <a href="mailto:kifayti@email.com" className="text-blue-600 font-bold">Get in touch at kifayti@email.com</a>
      </div>
    </div>
  );
};

export default AboutSection;
