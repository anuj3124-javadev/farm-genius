import React from 'react';
import { FaHome, FaCogs } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/')}>
          <FaHome className="menu-icon" />
          {isSidebarOpen && <span>Home</span>}
        </li>
        <li onClick={() => navigate('/services')}>
          <FaCogs className="menu-icon" />
          {isSidebarOpen && <span>Services</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
