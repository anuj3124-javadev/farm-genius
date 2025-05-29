import React, { useState, useEffect } from "react";
import "../../styles.css";

const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg"
];

const BuyerHome = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-layout">
      {/* Slideshow */}
      <div className="home-slideshow">
        <img src={images[currentImage]} alt="Slideshow" className="slide-image" />
      </div>

      {/* Services Section */}
      <section className="home-section">
       <h2 style={{ color: "black" }}>Services</h2>
        <div className="home-services">
          <div className="service-box">
              <img src="/images/AI-service.jpg" alt="AI service" />
              <h3>AI service</h3>
              <p>In this service we provide you advance knowledge of Crops.</p>
            </div>
            <div className="service-box">
              <img src="/images/Crop-health.jpg" alt="Branding" />
              <h3>Crop's Health</h3>
              <p>With this feature you check the health of your crops.</p>
            </div>

            <div className="service-box">
              <img src="/images/weather.webp" alt="Development" />
              <h3>Weather</h3>
              <p>From this feature we provide weather details for up to 10 days.</p>
              </div>
        </div>
      </section>

      {/* Govt. Policy & Scheme Section */}
      <section className="home-section">
        <h2 style={{ color: "black" }}>Govt. Policy & Scheme</h2>
        <div className="home-policies-schemes">
          <div className="policies">Policies</div>
          <div className="schemes">Schemes</div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="home-section">
        <h2 style={{ color: "black" }}>About Us</h2>
        <p>We are committed to providing the best services for farmers, buyers, and sellers.</p>
      </section>
    </div>
  );
};

export default BuyerHome ;
