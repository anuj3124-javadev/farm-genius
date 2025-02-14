import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles.css";

const Service = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
  return (
    
   
   <div className="container">
         <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="layout">/
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className={`home ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
 

        <section className="section" >
          <h2>Our Services</h2>
          <p>Enjoy Our Services</p>
          <div className="services-container">
            
            <div className="service-box">
              <img src="/images/AI-service.jpg" alt="AI service" />
              <h3>AI service</h3>
              <p>In this service we provide you advance knowledge of Crops.</p>
              <Link to="/src/components/Ai.js">AI Service</Link>
            </div>
            
            <div className="service-box">
              <img src="/images/Crop-health.jpg" alt="Branding" />
              <h3>Crop's Health</h3>
              <p>With this feature you check the helath of your crop's.</p>
              <Link to="">Crops health</Link>
            </div>
            
            <div className="service-box">
              <img src="/images/weather.webp" alt="Development" />
              <h3>weather</h3>
              <p>From this feature we provide weather details of maximum 10 days.</p>
              <Link to="">Weather</Link>
            </div>
            
            <div className="service-box">
              <img src="/images/crop-edu.jpg" alt="Web Design" />
              <h3>Crop eductaion</h3>
              <p>From this feature you get education about crops from farmers through video.</p>
              <Link to="">Education</Link>
            </div>
           
          </div>
          <div className="learn-more">
          <Link to="">Learn More</Link>
          </div>
        </section>

 
      </main>
    </div>
    </div>
  );
};

export default Service;
