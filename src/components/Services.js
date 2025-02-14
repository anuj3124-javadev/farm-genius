import React, { useState } from 'react';
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
      <div className="layout">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className={`home ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
 

        <section className="section" >
          <h2>Our Services</h2>
          <p>Consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.</p>
          <div className="services-container">
            
            <div className="service-box">
              <img src="icons/strategy.svg" alt="Strategy" />
              <h3>AI service</h3>
              <p>In this service we provide you advance knowledge of Crops.</p>
              <a href=''>click here</a>
            </div>
            
            <div className="service-box">
              <img src="icons/branding.svg" alt="Branding" />
              <h3>Crop's Health</h3>
              <p>With this feature you check the helath of your crop's.</p>
              <a href=''>click here</a>
            </div>
            
            <div className="service-box">
              <img src="icons/development.svg" alt="Development" />
              <h3>weather</h3>
              <p>From this feature we provide weather details of maximum 10 days.</p>
              <a href=''>click here</a>
            </div>
            
            <div className="service-box">
              <img src="icons/web-design.svg" alt="Web Design" />
              <h3>Crop eductaion</h3>
              <p>From this feature you get education about crops from farmers through video.</p>
              <a href=''>click here</a>
            </div>
           
          </div>
          {/* <div className="learn-more">
            <a href="#">Learn More</a>
          </div> */}
        </section>

 
      </main>
    </div>
    </div>
  );
};

export default Service;
