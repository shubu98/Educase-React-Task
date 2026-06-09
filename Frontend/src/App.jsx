import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="mobile-screen">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
