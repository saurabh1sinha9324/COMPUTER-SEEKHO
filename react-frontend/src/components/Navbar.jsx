import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation(); 

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
  }, [location]); 

  const adminLink = isLoggedIn ? "/admin" : "/login";

  return (
    <nav className="container-fluid d-flex justify-content-center navbar">
      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link
              to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`}
              className="nav-link"
            >
              {item.toUpperCase()}
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <Link to={adminLink} className="nav-link">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
