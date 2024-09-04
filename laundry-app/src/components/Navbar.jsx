import React from 'react';
import styles from '../styles/nav.module.css';


const Navbar = () => {
  let isAdmin = false;
  return (
    <nav className={styles.navbar}>
      <h1>Ladro Padro</h1>
      <div className={styles.links}>
        <a href="/">Home</a>
        {isAdmin && <a href="/adminview">Admin View</a>}
        <a href="accountsetup">Account Setup</a>
        <a href="/userview">User View</a>
      </div>
    </nav>
  );
};

export default Navbar;
