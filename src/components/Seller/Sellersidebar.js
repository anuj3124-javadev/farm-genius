import React from 'react';
import { FaHome, FaCogs, FaCloudRain, FaStore, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';

const Sellersidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/Sel-Home')}>
          <FaHome className="menu-icon" />
          {isSidebarOpen && <span>Home</span>}
        </li>
        <li onClick={() => navigate('/Sel-Service')}>
          <FaCogs className="menu-icon" />
          {isSidebarOpen && <span>Services</span>}
        </li>
        <li onClick={() => navigate('/Weather')}>
          <FaCloudRain className="menu-icon" />
          {isSidebarOpen && <span>Weather</span>}
        </li>
        <li onClick={() => navigate('/all-product')}>
          <FaStore className="menu-icon" />
          {isSidebarOpen && <span>All Product</span>}
        </li>
        <li onClick={() => navigate('/add-product')}>
          <FaShoppingCart className="menu-icon" />
          {isSidebarOpen && <span>Add Product</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sellersidebar;
