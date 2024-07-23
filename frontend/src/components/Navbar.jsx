import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        Launch Interview Portal
      </div>
      <div className="navbar-links">
        <Link to="/home" className="navbar-link">Home</Link>
        <Link to="/self-recording" className="navbar-link">Record</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
