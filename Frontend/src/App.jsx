import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import CreateAccount from './Components/CreateAccount';
import Login from './Components/Login';
import Profile from './Components/Profile';
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
