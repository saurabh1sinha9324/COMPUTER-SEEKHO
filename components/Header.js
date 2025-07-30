import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="logo">SMVITA</div>
      <nav className="nav-links">
        <a href="/home">Home</a>
        <a href="/placement">Placement</a>
        <a href="/recruiters">Recruiters</a>
        <a href="/contact">Contact</a>
        <a href="/register">Register</a>
      </nav>
    </header>
  );
};

export default Header;
