import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">Hello there</p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
