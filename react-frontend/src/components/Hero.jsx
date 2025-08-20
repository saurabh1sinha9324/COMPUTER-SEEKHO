// Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <img src="/Hero/main1.png" alt="Hero" className="hero-image" />
        {/* Optional Title or CTA */}
        {/* <div className="hero-text">
          <h1>Welcome to VITA</h1>
          <p>Empowering Future Through Education</p>
          <button className="hero-button">Explore Courses</button>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
