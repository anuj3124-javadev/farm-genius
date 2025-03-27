import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Services from './components/Services';
import Weather from './components/Weather';
import Login from './components/Login';
import Ai from './components/Ai'; // Import AI component

import './styles.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Header 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isLoggedIn={isLoggedIn} 
          onLoginClick={handleLoginClick} 
        />
        <div className="layout">
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <main className={`content ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ai-service" element={<Ai />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/login" element={<Login />} />

            </Routes>
          </main>
        </div>
        {isLoginOpen && <Login onClose={handleCloseLogin} onLogin={handleLoginSuccess} />}
      </div>
    </Router>
  );
}

export default App;