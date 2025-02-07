import React from 'react';
import { FaHome, FaCloud, FaCogs, FaBook } from 'react-icons/fa';
import '../styles.css';

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <ul className="sidebar-menu">
        <li>
          <FaHome className="menu-icon" />
          {isSidebarOpen && <span>Home</span>}
        </li>
        <li>
          <FaCloud className="menu-icon" />
          {isSidebarOpen && <span>Weather</span>}
        </li>
        <li>
          <FaCogs className="menu-icon" />
          {isSidebarOpen && <span>Services</span>}
        </li>
        <li>
          <FaBook className="menu-icon" />
          {isSidebarOpen && <span>Policies</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
