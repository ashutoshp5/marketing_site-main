import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar
import Footer from './components/Footer'; // Import the Footer
import Home from './pages/Home'; // Import the Home page
import Aboutus from './pages/Aboutus'; // Import the About Us page
import Blogs from './pages/Blogs'; // Import the Blogs page
import Contact from './pages/Contact'; // Import the Contact page
import Doctors from './pages/Doctors'; // Import the Doctors page
import Patients from './pages/Patients'; // Import the Patients page
import ScrollToTop from './components/ScrollToTop'; // Import the ScrollToTop component
import BlogDetail from './components/BlogDetail';
import AdminDashboard from './pages/AdminDashboard'; // Import the Admin Dashboard

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Ensure this is placed inside the Router */}
      
      <Routes>
        {/* Admin Route - No Navbar/Footer */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Regular Routes with Navbar/Footer */}
        <Route path="/*" element={
          <>
            <Navbar /> {/* Navbar that stays constant across all pages */}
            <Routes>
              <Route path="/" element={<Home />} /> {/* Home Page */}
              <Route path="/about" element={<Aboutus />} /> {/* About Us Page */}
              <Route path="/blogs" element={<Blogs />} /> {/* Blogs Page */}
              <Route path="/blogs/:id" element={<BlogDetail/>} /> {/* Blog Detail Page */}
              <Route path="/contact" element={<Contact />} /> {/* Contacts Page */}
              <Route path="/doctors" element={<Doctors />} /> {/* Doctors Page */}
              <Route path="/patients" element={<Patients />} /> {/* Patients Page */}
            </Routes>
            <Footer /> {/* Footer that stays constant across all pages */}
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
