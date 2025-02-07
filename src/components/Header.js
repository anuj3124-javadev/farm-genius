import React from 'react';
import { FaEllipsisV, FaBell, FaUser } from 'react-icons/fa';
import '../styles.css';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="header">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '✖' : <FaEllipsisV />}
      </button>
      <h1 className="header-title">Farm-genius</h1>
      <div className="header-options">
        <FaBell className="icon" />
        <FaUser className="icon" />
      </div>
    </header>
  );
};

export default Header;
