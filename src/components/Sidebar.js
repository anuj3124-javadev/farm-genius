import React from 'react';
import { FaHome, FaCogs, FaCloudRain, FaPagelines, FaSeedling } from 'react-icons/fa';
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
        <li onClick={() => navigate('/Weather')}>
          <FaCloudRain className="menu-icon" />
          {isSidebarOpen && <span>Weather</span>}
        </li>
        <li onClick={() => navigate('/Add-Crop')}>
          <FaPagelines className="menu-icon" />
          {isSidebarOpen && <span>Add-Crop</span>}
        </li>
        <li onClick={() => navigate('/Crop-List')}>
          <FaSeedling className="menu-icon" />
          {isSidebarOpen && <span>Crop-List</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
