import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-start gap-8 pb-8 border-b border-gray-700">
          {/* Contact Section */}
          <div className="flex-1 min-w-48">
            <h3 className="text-white text-xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">Contact Us</h3>
            <p className="text-gray-300 text-sm mb-2 leading-6">
              <FaEnvelope className="inline mr-2" />
              info@foodweb.com
            </p>
            <p className="text-gray-300 text-sm mb-2 leading-6">
              <FaPhone className="inline mr-2" />
              (555) 123-4567
            </p>
            <p className="text-gray-300 text-sm mb-2 leading-6">
              <FaMapMarkerAlt className="inline mr-2" />
              123 Food Street, Cuisine City
            </p>
          </div>

          {/* Opening Hours Section */}
          <div className="flex-1 min-w-48">
            <h3 className="text-white text-xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">Opening Hours</h3>
            <p className="text-gray-300 text-sm mb-2 leading-6">
              <FaClock className="inline mr-2" />
              Monday - Friday: 9:00 AM - 10:00 PM
            </p>
            <p className="text-gray-300 text-sm mb-2 leading-6">
              <FaClock className="inline mr-2" />
              Saturday - Sunday: 10:00 AM - 11:00 PM
            </p>
          </div>

          {/* Social Links Section */}
          <div className="flex-1 min-w-48">
            <h3 className="text-white text-xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 no-underline transition-colors duration-300 flex items-center gap-2 hover:text-blue-500">
                <FaFacebook /> Facebook
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 no-underline transition-colors duration-300 flex items-center gap-2 hover:text-blue-500">
                <FaInstagram /> Instagram
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 no-underline transition-colors duration-300 flex items-center gap-2 hover:text-blue-500">
                <FaTwitter /> Twitter
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex-1 min-w-48">
            <h3 className="text-white text-xl font-semibold mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">Quick Links</h3>
            <p className="text-gray-300 text-sm mb-2 leading-6"><a href="/about" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">About Us</a></p>
            <p className="text-gray-300 text-sm mb-2 leading-6"><a href="/menu" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">Menu</a></p>
            <p className="text-gray-300 text-sm mb-2 leading-6"><a href="/contact" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">Contact</a></p>
            <p className="text-gray-300 text-sm mb-2 leading-6"><a href="/privacy" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">Privacy Policy</a></p>
            <p className="text-gray-300 text-sm mb-2 leading-6"><a href="/terms" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">Terms of Service</a></p>
            <p className="text-gray-300 text-sm mb-2 leading-6"><a href="/refund" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">Refund Policy</a></p>
            <p className="text-gray-300 text-sm mb-2 leading-6"><a href="/shipping" className="text-gray-300 hover:text-blue-500 transition-colors duration-300">Delivery Policy</a></p>
          </div>
        </div>

        <div className="pt-8 text-center text-gray-300 text-sm">
          <p>&copy; 2024 FoodWeb. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;