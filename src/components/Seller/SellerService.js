import React from 'react';
import { Link } from "react-router-dom";
import "../../styles.css";

const SellerService = () => {
  return (
    <div className="container">
      <main className="home without-sidebar">
        <section className="section">
          <h2>Our Services</h2>
          <p>Enjoy Our Services</p>
          <div className="services-container">
            <div className="service-box">
              <img src="/images/AI-service.jpg" alt="AI service" />
              <h3>AI service</h3>
              <p>In this service we provide you advance knowledge of Crops.</p>
              <Link to="/ai-service">AI Service</Link>
            </div>
            
            <div className="service-box">
              <img src="/images/Crop-health.jpg" alt="Branding" />
              <h3>Crop's Health</h3>
              <p>With this feature you check the health of your crops.</p>
              <Link to="/crop-health">Crops health</Link>
            </div>
            
            <div className="service-box">
              <img src="/images/weather.webp" alt="Development" />
              <h3>Weather</h3>
              <p>From this feature we provide weather details for up to 10 days.</p>
              <Link to="/weather">Weather</Link>
            </div>
            
            <div className="service-box">
              <img src="/images/crop-edu.jpg" alt="Web Design" />
              <h3>Crop Education</h3>
              <p>From this feature, you get education about crops from farmers through video.</p>
              <Link to="/crop-edu">Crops Education</Link>

            </div>
          </div>
          <div className="learn-more">
            <Link to="">Learn More</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerService;
