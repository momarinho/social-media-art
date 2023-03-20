import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-2">You can reach us at:</p>
        <ul className="text-lg text-gray-600 mb-4">
          <li>Email: info@company.com</li>
          <li>Phone: 555-555-5555</li>
          <li>Address: 123 Main St, Anytown, USA</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
