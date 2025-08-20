import React from 'react';
import './Footer.css';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/Placement");
  };

  
  const handleRedirect1 = () => {
    navigate("/campuslife");
  };
    const handleRedirect3 = () => {
    navigate("/");
  };
  
  const handleRedirect4 = () => {
    navigate("/courses");
  };
   const handleRedirect5 = () => {
    navigate("/faculty");
  };
  return (
    <footer className="footer">
      <div className="footer-section quick-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a onClick={handleRedirect3}>Home</a></li>
          <li><a onClick={handleRedirect4}>PG-DAC</a></li>
          <li><a onClick={handleRedirect4}>PG-DBDA</a></li>
          <li><a onClick={handleRedirect4}>MS-CIT</a></li>
        
          <li><a onClick={handleRedirect}>Placement</a></li>
          <li><a onClick={handleRedirect1}>Campus Life</a></li>
          <li><a onClick={handleRedirect5}>Faculty</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-section address">
        <h3>Authorised Training Centre</h3>
        <p>5th Floor, TechnoHub Innovation Center <br /> Galaxy Avenue, Orion Road, Zenith Park<br /> Sector 21, New City (E), Pune 411 045 <br /> India <br /> 9029435311 / 9324095272 <br />9987062416</p>
        
        
      </div>
      
      <div className="footer-section social-icons">
        
        <ul>
          <li><a href="#"><img src="/Footer/x.webp" alt="Twitter"/></a></li>
          <li><a href="#"><img src="/Footer/youtube.png" alt="YouTube"/></a></li>
          <li><a href="#"><img src="/Footer/linkdin.webp" alt="LinkedIn"/></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
