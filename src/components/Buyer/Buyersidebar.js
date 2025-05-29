import React from 'react';
import { FaHome, FaCogs, FaStore, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles.css';

const Buyersidebar = ({ isSidebarOpen }) => {
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
        <li onClick={() => navigate('/crop-store')}>
          <FaStore className="menu-icon" />
          {isSidebarOpen && <span>Crop-Store</span>}
        </li>
        <li onClick={() => navigate('/bcart')}>
          <FaShoppingCart className="menu-icon" />
          {isSidebarOpen && <span>Cart</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Buyersidebar;
