import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="md:flex">
          <div className="flex flex-col md:mr-12">
            <h3 className="text-lg font-bold mb-2 text-gray-400">Explore</h3>
            <Link to="/" className="text-gray-400 hover:text-gray-200 mb-1">
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-400 hover:text-gray-200 mb-1"
            >
              About
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-gray-200">
              Contact
            </Link>
          </div>
          <div className="flex flex-col md:mr-12">
            <h3 className="text-lg font-bold mb-2 text-gray-400">
              Connect with us
            </h3>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-200 mb-1"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-200 mb-1"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-200"
            >
              Instagram
            </a>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} momarinho. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
