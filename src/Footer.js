import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Contact Section */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              <FaEnvelope className="inline mr-2" />
              info@foodweb.com
            </p>
            <p>
              <FaPhone className="inline mr-2" />
              (555) 123-4567
            </p>
            <p>
              <FaMapMarkerAlt className="inline mr-2" />
              123 Food Street, Cuisine City
            </p>
          </div>

          {/* Opening Hours Section */}
          <div className="footer-section">
            <h3>Opening Hours</h3>
            <p>
              <FaClock className="inline mr-2" />
              Monday - Friday: 9:00 AM - 10:00 PM
            </p>
            <p>
              <FaClock className="inline mr-2" />
              Saturday - Sunday: 10:00 AM - 11:00 PM
            </p>
          </div>

          {/* Social Links Section */}
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <FaFacebook /> Facebook
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram /> Instagram
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter /> Twitter
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <p><a href="/about">About Us</a></p>
            <p><a href="/menu">Menu</a></p>
            <p><a href="/contact">Contact</a></p>
            <p><a href="/privacy">Privacy Policy</a></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 FoodWeb. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;