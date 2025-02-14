import React from "react";
import "../styles.css";

const Services = () => {
  // Click handler for service buttons
  const handleServiceClick = (serviceName) => {
    console.log(`${serviceName} button clicked!`);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Explore the wide range of services we offer to cater to your needs.</p>
        </div>
      </header>

      {/* Services Section */}
      <main className="services-section">
        <div className="container">
          <div className="services-grid">
            {/* Service Cards */}
            <div className="service-card">
              <i className="fas fa-code service-icon"></i>
              <h2>Web Development</h2>
              <p>Build responsive and engaging websites tailored to your business needs.</p>
              <button
                className="service-btn"
                onClick={() => handleServiceClick("Web Development")}
              >
                Learn More
              </button>
            </div>
            <div className="service-card">
              <i className="fas fa-mobile-alt service-icon"></i>
              <h2>App Development</h2>
              <p>Create feature-rich mobile apps with seamless performance across devices.</p>
              <button
                className="service-btn"
                onClick={() => handleServiceClick("App Development")}
              >
                Learn More
              </button>
            </div>
            <div className="service-card">
              <i className="fas fa-bullhorn service-icon"></i>
              <h2>Digital Marketing</h2>
              <p>Boost your brand’s online presence with expert SEO and social media strategies.</p>
              <button
                className="service-btn"
                onClick={() => handleServiceClick("Digital Marketing")}
              >
                Learn More
              </button>
            </div>
            <div className="service-card">
              <i className="fas fa-paint-brush service-icon"></i>
              <h2>Graphic Design</h2>
              <p>Design visually stunning graphics that leave a lasting impression.</p>
              <button
                className="service-btn"
                onClick={() => handleServiceClick("Graphic Design")}
              >
                Learn More
              </button>
            </div>
            <div className="service-card">
              <i className="fas fa-cloud service-icon"></i>
              <h2>Cloud Solutions</h2>
              <p>Secure and scalable cloud solutions to drive your business growth.</p>
              <button
                className="service-btn"
                onClick={() => handleServiceClick("Cloud Solutions")}
              >
                Learn More
              </button>
            </div>
            <div className="service-card">
              <i className="fas fa-lightbulb service-icon"></i>
              <h2>Consulting</h2>
              <p>Get expert advice to transform your ideas into actionable solutions.</p>
              <button
                className="service-btn"
                onClick={() => handleServiceClick("Consulting")}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
