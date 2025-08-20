import React from 'react';
import './Header.css';
import { FaLaptopCode, FaBook, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="header-left">
        <img src="/Header/LogoFinalPng.png" alt="Brain Infotech Academy Logo" className="logo" />
      </div>

      {/* Center: Animated Institute Name */}
      <div className="header-center">
        <h1 className="animated-text">Brain Infotech Academy</h1>
      </div>

      {/* Floating icons */}
      <FaLaptopCode className="floating-icon icon1" />
      <FaBook className="floating-icon icon2" />
      <FaGraduationCap className="floating-icon icon3" />
      <FaChalkboardTeacher className="floating-icon icon4" />
    </header>
  );
};

export default Header;
