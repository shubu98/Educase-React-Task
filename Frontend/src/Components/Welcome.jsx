import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="screen welcome-screen">
      <div className="welcome-content">
        <h1>Welcome to PopX</h1>
        <p className="subtitle">Welcome to PopX, your simple and secure platform for managing your profile.</p>
        <button className="btn btn-primary" onClick={() => navigate('/register')}>Create Account</button>
        <button className="btn btn-secondary" onClick={() => navigate('/login')}>Already Registered? Login</button>
      </div>
    </div>
  );
}

export default Welcome;
