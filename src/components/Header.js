import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisV, FaBell, FaSignOutAlt } from 'react-icons/fa';
import '../styles.css';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const photo = localStorage.getItem('userPhoto'); // Store this after login
    if (token) {
      setIsLoggedIn(true);
      if (photo) setUserPhoto(photo);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');
  const goToDashboard = () => navigate('/dashboard'); // or '/profile'

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userPhoto');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '✖' : <FaEllipsisV />}
      </button>
      <h1 className="header-title">Farm-genius</h1>

      <div className="header-options">
        {!isLoggedIn ? (
          <>
            <button onClick={handleLogin} className="auth-btn login">Login</button>
            <button onClick={handleSignup} className="auth-btn signup">Signup</button>
          </>
        ) : (
          <div className="user-controls">
            <FaBell className="icon" title="Notifications" />

            <img
              src={userPhoto || 'https://via.placeholder.com/35'} // fallback image
              alt="User"
              className="profile-pic"
              onClick={goToDashboard}
              title="Go to Dashboard"
            />

            <FaSignOutAlt
              className="icon logout-icon"
              title="Logout"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
