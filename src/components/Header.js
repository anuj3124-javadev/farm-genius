import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate hook
import { FaEllipsisV, FaBell, FaUser } from 'react-icons/fa';
import '../styles.css';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const goToLogin = () => {
    navigate('/Login'); // ✅ redirects to /login
  };

  return (
    <header className="header">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '✖' : <FaEllipsisV />}
      </button>
      <h1 className="header-title">Farm-genius</h1>
      <div className="header-options">
        <FaBell className="icon" />
        <FaUser className="icon" onClick={goToLogin} style={{ cursor: 'pointer' }} /> {/* ✅ clickable user icon */}
      </div>
    </header>
  );
};

export default Header;
