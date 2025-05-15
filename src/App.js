import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Services from './components/Services';
import Weather from './components/Weather';
import AddProduct from './components/AddProduct';
import  Dashboard from './components/Dashboard';
import CropList from './components/CropList';
import Login from './components/Login';
import Registration from './components/Registration'; // Import Registration Component
import Ai from './components/Ai';
import Crophealth from './components/Crophealth'; 
import './styles.css';
import CropEducation from './components/Cropeducation';
import Chatbtn from './components/Chatbtn';

// ✅ Main Layout Component (For Pages with Sidebar & Header)
const MainLayout = ({ children, isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="layout">
        <Sidebar isSidebarOpen={isSidebarOpen} />
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
          path="/ai-service"
          element={
            <MainLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
              <Ai />
            </MainLayout>
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
