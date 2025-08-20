import React from 'react';
import './Footer.css';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "PG-DAC", path: "/courses" },
    { name: "PG-DBDA", path: "/courses" },
    { name: "MS-CIT", path: "/courses" },
    { name: "Placement", path: "/Placement" },
    { name: "Campus Life", path: "/campuslife" },
    { name: "Faculty", path: "/faculty" },
    
  ];

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // smooth scroll to top
    });
  };

  return (
    <footer className="footer-modern">
      <div className="footer-container">
        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a onClick={() => handleNavigate(link.path)}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div className="footer-section address">
          <h3>Authorized Training Centre</h3>
          <p>
            5th Floor, TechnoHub Innovation Center <br />
            Galaxy Avenue, Orion Road, Zenith Park <br />
            Sector 21, New City (E), Pune 411 045 <br />
            India <br />
            9029435311 / 9324095272 / 9987062416
          </p>
        </div>

        {/* Social Icons */}
        <div className="footer-section social-icons">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="#"><img src="/Footer/x.webp" alt="Twitter" /></a></li>
            <li><a href="#"><img src="/Footer/youtube.png" alt="YouTube" /></a></li>
            <li><a href="#"><img src="/Footer/linkdin.webp" alt="LinkedIn" /></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BRAIN INFOTECH. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
