import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '', phone_number: '', email_address: '', password: '', company_name: '', is_agency: false, profile_image_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios POST handler logic replace native fetch structure
      const response = await axios.post('https://educase-react-task-backend.onrender.com/api/register', formData);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Registration submission sequence intercepted with errors.');
    }
  };

  return (
    <div className="screen form-screen">
      <h1>Create your<br />PopX account</h1>
      <form onSubmit={handleSubmit} className="scrollable-form">
        <div className="input-group">
          <label>Full Name*</label>
          <input type="text" name="full_name" required onChange={handleChange} placeholder="Enter full name" />
        </div>
        <div className="input-group">
          <label>Phone number*</label>
          <input type="text" name="phone_number" required onChange={handleChange} placeholder="Enter phone number" />
        </div>
        <div className="input-group">
          <label>Email address*</label>
          <input type="email" name="email_address" required onChange={handleChange} placeholder="Enter email address" />
        </div>
        <div className="input-group">
          <label>Password*</label>
          <input type="password" name="password" required onChange={handleChange} placeholder="Enter password" />
        </div>
        <div className="input-group">
          <label>Company name</label>
          <input type="text" name="company_name" onChange={handleChange} placeholder="Enter company name" />
        </div>
        <div className="input-group">
          <label>Profile Image URL</label>
          <input type="url" name="profile_image_url" onChange={handleChange} placeholder="Paste live image path (https://...)" />
        </div>
        
        <div className="radio-group">
          <p>Are you an Agency?*</p>
          <div className="radio-options">
            <label>
              <input type="radio" name="is_agency" value="true" onChange={() => setFormData({...formData, is_agency: true})} /> Yes
            </label>
            <label>
              <input type="radio" name="is_agency" value="false" defaultChecked onChange={() => setFormData({...formData, is_agency: false})} /> No
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
