import React from 'react';
import Layout from '../layout/Layout.js';
import TestComponent from '../components/TestComponent.jsx';
import styles from '../styles/main.module.css';


const Home = () => {
  return (
    <Layout>
      <h1 className={styles.h1}>This is Home Page</h1>
      <TestComponent />
    </Layout>
  );
};

export default Home;

