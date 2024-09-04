import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import AdminView from './pages/AdminView.js';
import AccountSetup from './pages/AccountSetup.js';
import UserView from './pages/UserView.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminview" element={<AdminView />} />
          <Route path="/accountsetup" element={<AccountSetup />} />
          <Route path="/userview" element={<UserView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
