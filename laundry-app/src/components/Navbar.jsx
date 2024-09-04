// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-menu">
        <a href="/">Home</a>
        <a href="/adminview">Admin View</a>
        <a href="accountsetup">Account Setup</a>
        <a href="/userview">User View</a>
      </div>
    </nav>
  );
};

export default Navbar;
