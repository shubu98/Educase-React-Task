import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Direct post mapping optimization via Axios package instance
      const response = await axios.post('http://localhost:5000/api/login', {
        email_address: email,
        password: password
      });
      
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.error || 'Authentication layer clearance failed.');
    }
  };

  return (
    <div className="screen form-screen">
      <h1>Signin to your<br />PopX account</h1>
      <p className="subtitle">Welcome back! Log in to continue using your PopX account.</p>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
        </div>
        <button type="submit" className={`btn submit-btn ${email && password ? 'btn-primary' : 'btn-disabled'}`}>Login</button>
      </form>
    </div>
  );
}

export default Login;
