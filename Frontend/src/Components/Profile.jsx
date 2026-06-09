import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(
          'https://educase-react-task-backend.onrender.com/api/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="screen centered-info">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="screen profile-screen">
      <div className="header-bar">
        Account Settings
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar-wrapper">
            <img
              src={user?.profile_image_url || defaultAvatar}
              alt="Profile"
              className="avatar-img"
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
          </div>

          <div className="profile-info">
            <h2>{user?.full_name}</h2>
            <p>{user?.email_address}</p>
          </div>
        </div>

        <p className="bio-text">
          Welcome to your profile page.
        </p>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;