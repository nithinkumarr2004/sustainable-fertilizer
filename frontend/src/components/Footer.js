import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaLeaf className="text-2xl text-primary-400" />
              <span className="font-bold text-xl">SmartFertilizer</span>
            </div>
            <p className="text-gray-400">
              Optimizing fertilizer usage through AI and data analytics for sustainable agriculture.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">About Fertilizers</Link>
              </li>
              <li>
                <Link to="/news-events" className="hover:text-white">News & Events</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link to="/prediction" className="hover:text-white">Prediction Tool</Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white">History</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <FaEnvelope />
                <span>info@smartfertilizer.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt />
                <span>123 Agriculture St, Farm City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SmartFertilizer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
