// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Buyersidebar from './components/Buyer/Buyersidebar';
import Sellersidebar from './components/Seller/Sellersidebar';

import Home from './components/Home';
import BuyerHome from './components/Buyer/BuyerHome';
import SellerHome from './components/Seller/SellerHome';
import FarmerHome from './components/Farmer/FarmerHome';
import Services from './components/Services';
import SellerService from './components/Seller/SellerService';
import AddProduct from './components/AddProduct';
import Dashboard from './components/Dashboard';
import CropList from './components/CropList';
import Cropstore from './components/Buyer/CropStore';
import Cart from './components/Buyer/Cart';
import Login from './components/Login';
import Registration from './components/Registration';
import Ai from './components/Ai';
import Crophealth from './components/Crophealth';
import CropEducation from './components/Cropeducation';
import Chatbtn from './components/Chatbtn';
import ServerStatus from './components/Serverstatus';
import Addproduct from './components/Seller/Addproduct';
import AllProduct from './components/Seller/AllProduct';
import Weather from './components/Weather';

import './styles.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleStorageChange = () => {
      const newRole = localStorage.getItem("role");
      setRole(newRole);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const MainLayout = ({ children }) => {
    const renderSidebar = () => {
      if (role === "ROLE_FARMER") return <Sidebar isSidebarOpen={isSidebarOpen} />;
      if (role === "ROLE_BUYER") return <Buyersidebar isSidebarOpen={isSidebarOpen} />;
      if (role === "ROLE_SELLER") return <Sellersidebar isSidebarOpen={isSidebarOpen} />;
      return null;
    };

    return (
      <>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="layout">
          {renderSidebar()}
          <main className={`content ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
            {children}
          </main>
          <Chatbtn />
        </div>
      </>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/signup" element={<Registration />} />

        {/* Main Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/Bu-Home" element={<MainLayout><BuyerHome /></MainLayout>} />
        <Route path="/Sel-Home" element={<MainLayout><SellerHome /></MainLayout>} />
        <Route path="/Fa-Home" element={<MainLayout><FarmerHome /></MainLayout>} />
        <Route path="/Sel-Service" element={<MainLayout><SellerService /></MainLayout>} />
        <Route path="/add-product" element={<MainLayout><Addproduct /></MainLayout>} />
        <Route path="/all-product" element={<MainLayout><AllProduct /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/Add-Crop" element={<MainLayout><AddProduct /></MainLayout>} />
        <Route path="/Crop-List" element={<MainLayout><CropList /></MainLayout>} />
        <Route path="/crop-store" element={<MainLayout><Cropstore /></MainLayout>} />
        <Route path="/bcart" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/ai-service" element={<MainLayout><Ai /></MainLayout>} />
        <Route path="/server-status" element={<ServerStatus />} />
        <Route path="/crop-health" element={<MainLayout><Crophealth /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/crop-edu" element={<MainLayout><CropEducation /></MainLayout>} />
        <Route path="/Chat" element={<MainLayout><Chatbtn /></MainLayout>} />
        <Route path="/weather" element={<MainLayout><Weather /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
