import React from 'react';
import {useState} from 'react';
import styles from '../styles/nav.module.css';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(prevState => !prevState);
    setHasOpened(true);
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
      {menuVisible && <div className={styles.overlay} onClick={toggleMenu} />}
      <div className={`${styles.links} ${menuVisible ? styles.show : (hasOpened ? styles.hide : styles.hidden)}`}>
        <a href="accountsetup">Account Setup</a>
        {isAdmin && <a href="/adminview">Admin View</a>}
        <a href="/userview">User View</a>
        <a href="/">Home</a>
      </div>
    </nav>
    
  );
};


export default Navbar;
