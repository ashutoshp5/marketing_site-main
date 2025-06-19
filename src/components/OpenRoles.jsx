import React, { useState } from 'react';
import { Briefcase, MapPin, Building, Mail, ChevronRight, Search } from 'lucide-react';

const OpenRoles = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const roles = [
    { id: 1, title: "Career Option 1", location: "Location 1", department: "Department 1" },
    { id: 2, title: "Career Option 2", location: "Location 2", department: "Department 2" },
    { id: 3, title: "Career Option 3", location: "Location 3", department: "Department 3" },
    { id: 4, title: "Career Option 4", location: "Location 4", department: "Department 4" },
    { id: 5, title: "Career Option 5", location: "Location 5", department: "Department 5" },
    { id: 6, title: "Career Option 6", location: "Location 6", department: "Department 6" },
 ];

  return (
    <div className="min-h-screen  p-4 sm:p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-teal-800 animate-fade-in-down">Open Roles</h1>
          <p className="text-lg sm:text-xl text-teal-700 max-w-3xl mx-auto animate-fade-in-up">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque erat purus,
            molestie sit amet ligula non, suscipit ornare velit. Duis interdum sed nibh.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative animate-fade-in">
          <input
            type="text"
            placeholder="Search for roles..."
            className="w-full p-4 pr-12 rounded-full border-2 border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-teal-800 placeholder-teal-400"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-400" size={24} />
        </div>

        {/* Roles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
                hoveredRole === role.id ? 'ring-2 ring-red-500' : ''
              }`}
              onMouseEnter={() => setHoveredRole(role.id)}
              onMouseLeave={() => setHoveredRole(null)}
            >
              <div className="p-6">
                <h2 className="font-semibold text-2xl text-teal-800 mb-3">{role.title}</h2>
                <p className="text-teal-700 flex items-center mb-2">
                  <Briefcase className="mr-2 text-red-500" size={18} />
                  Open position in this team
                </p>
                <div className="flex flex-col space-y-2 mb-4">
                  <span className="text-teal-600 flex items-center">
                    <MapPin className="mr-2 text-red-400" size={18} />
                    {role.location}
                  </span>
                  <span className="text-teal-600 flex items-center">
                    <Building className="mr-2 text-red-400" size={18} />
                    {role.department}
                  </span>
                </div>
              </div>
              <div className={`bg-red-500 p-4 text-white flex justify-between items-center transition-all duration-300 ${
                hoveredRole === role.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <span>View Details</span>
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center animate-fade-in">
          <span className="text-teal-700 mb-4 sm:mb-0 text-center sm:text-left">Don't find what you are looking for?</span>
          <a href="mailto:kifayti@email.com" className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center">
            <Mail className="mr-2" size={18} />
            Get in touch at kifayti@email.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default OpenRoles;