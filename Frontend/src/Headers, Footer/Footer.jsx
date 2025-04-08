import React from 'react';
import './Footer.css';
// Import the required icons from react-icons
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa'; //importing icons

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">FPlanner</div>
          <div className="social-links">
            {/* Social icons */}
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p>Address: Flower Road, City</p>
          <p>Contact: 0123456789</p>
          <p>Email: sample@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Sample Solutions. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
