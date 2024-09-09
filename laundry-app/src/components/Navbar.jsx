import React from 'react';
import {useState} from 'react';
import styles from '../styles/nav.module.css';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(prevState => !prevState)
  };
  

  let isAdmin = true;
  
  return (
    <nav className={styles.navbar}>
      <div id={styles.top}>
        <h1>GT Laundry</h1>
        <button id={styles.dropdown} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </button>
      </div>
      <div className={`${styles.links} ${menuVisible ? styles.show : styles.hide}`}>
        <a href="accountsetup">Account Setup</a>
        {isAdmin && <a href="/adminview">Admin View</a>}
        <a href="/userview">User View</a>
        <a href="/">Home</a>
      </div>
    </nav>
    
  );
};


export default Navbar;
