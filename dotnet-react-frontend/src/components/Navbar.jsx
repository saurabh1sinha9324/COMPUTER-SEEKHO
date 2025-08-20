import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navItems = [
    'Home',
    'Placement',
    'Recruiters',
    'Courses',
    'Campus Life',
    'Faculty',
    'Get in Touch',
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
    setMobileMenu(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const adminLink = isLoggedIn ? "/admin" : "/login";

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="nav-logo">BIA</div>

      {/* Main Links */}
      <div className={`nav-links ${mobileMenu ? 'active' : ''}`}>
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`}
            className={`nav-link ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`) ? 'active' : ''}`}
          >
            {item.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Admin Link Right */}
      <div className="nav-admin">
        <Link 
          to={adminLink} 
          className={`nav-link admin ${location.pathname === adminLink ? 'active' : ''}`}
        >
          ADMIN
        </Link>
      </div>

      {/* Mobile Toggle */}
      <div className="nav-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
