import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Buyersidebar from './components/Buyer/Buyersidebar';
import Home from './components/Home';
import BuyerHome  from './components/Buyer/BuyerHome';
import SellerHome from './components/Seller/SellerHome';
import FarmerHome from './components/Farmer/FarmerHome';
import Services from './components/Services';
import SellerService from './components/Seller/SellerService';
import Weather from './components/Weather';
import AddProduct from './components/AddProduct';
import  Dashboard from './components/Dashboard';
import CropList from './components/CropList';
import Cropstore from './components/Buyer/CropStore';
import Cart from './components/Buyer/Cart';
import Login from './components/Login';
import Registration from './components/Registration'; // Import Registration Component
import Ai from './components/Ai';
import Crophealth from './components/Crophealth'; 
import './styles.css';
import CropEducation from './components/Cropeducation';
import Chatbtn from './components/Chatbtn';
import ServerStatus from './components/Serverstatus';
import Sellersidebar from './components/Seller/Sellersidebar';
import Addproduct from './components/Seller/Addproduct';
import AllProduct from './components/Seller/AllProduct';



// ✅ Main Layout Component (For Pages with Sidebar & Header)
const MainLayout = ({ children, isSidebarOpen, toggleSidebar }) => {
  const role = localStorage.getItem('role');
  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="layout">
      <Sidebar isSidebarOpen={isSidebarOpen} />
        {role === 'farmer' && <Sidebar isSidebarOpen={isSidebarOpen} />}
        {role === 'buyer' && <Buyersidebar isSidebarOpen={isSidebarOpen} />}
        {role === 'seller' && <Sellersidebar isSidebarOpen={isSidebarOpen} />}
        <main className={`content ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
          {children}
        </main>
        <Chatbtn />
      </div>
    </>
  );
};

// ✅ App Component
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* ✅ Pages with Header & Sidebar */}
        <Route
          path="/"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/Bu-Home"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <BuyerHome />
            </MainLayout>
          }
        />

        <Route
          path="/Sel-Home"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <SellerHome />
            </MainLayout>
          }
        />
        
        <Route
          path="/Sel-Service"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <SellerService />
            </MainLayout>
          }
        />
        
        <Route
          path="/add-product"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Addproduct />
            </MainLayout>
          }
        />
        
        
        <Route
          path="/all-product"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <AllProduct />
            </MainLayout>
          }
        />

        <Route
          path="/Fa-Home"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <FarmerHome />
            </MainLayout>
          }
        />

        <Route
          path="/services"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Services />
            </MainLayout>
          }
        />

        <Route
          path="/Add-Crop"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <AddProduct />
            </MainLayout>
          }
       />

        <Route
          path="/Crop-List"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <CropList />
            </MainLayout>
          }
       />
       
       <Route
          path="/crop-store"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Cropstore />
            </MainLayout>
          }
        />
        
        <Route
          path="/bcart"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Cart />
            </MainLayout>
          }
        />



        <Route
          path="/ai-service"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Ai />
            </MainLayout>
          }
        />
        
<Route
  path="/server-status"
  element={
    
      <ServerStatus />
    
  }
/>


        <Route
          path="/crop-health"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Crophealth />
            </MainLayout>
          }
        />

        
        <Route
          path="/dashboard"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/crop-edu"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <CropEducation/>
            </MainLayout>
          }
        />

         <Route
          path="/Chat"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Chatbtn/>
            </MainLayout>
          }
        />

        <Route
          path="/weather"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Weather />
            </MainLayout>
          }
        />

 v      <Route
          path="/Chat"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Chatbtn />
            </MainLayout>
  }
/>

        {/* ✅ Login & Registration Pages (WITHOUT Header & Sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} /> {/* ✅ Add Registration Route */}
      </Routes>
      
    </Router>
  );
}

export default App;
