import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <div className='footer'>
      <p>&copy; {new Date().getFullYear()} EvenSplit. All rights reserved.</p>
      <div className='footer-links'>
        <a href='/about'>About Us</a>
        <a href='/contact'>Contact</a>
        <a href='/privacy'>Privacy Policy</a>
      </div>
    </div>
  );
}

export default Footer;
