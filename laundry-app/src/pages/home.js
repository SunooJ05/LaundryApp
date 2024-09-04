import React from 'react';
import Layout from '../layout/Layout.js';
import TestComponent from '../components/TestComponent.jsx';


const Home = () => {
  return (
    <Layout>
      <h1>This is Home Page</h1>
      <TestComponent />
    </Layout>
  );
};

export default Home;

