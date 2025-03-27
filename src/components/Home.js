import React from 'react';
import '../styles.css';

const Home = () => {
  return (
    <div className="layout">
      <main className="home without-sidebar">
        <section className="section">
          <h2>Weather Reports</h2>
          <div className="weather">
            <p>Weather Data Placeholder</p>
          </div>
        </section>
        <section className="section">
          <h2>Services</h2>
          <div className="services">
            <div className="service">Service 1</div>
            <div className="service">Service 2</div>
            <div className="service">Service 3</div>
          </div>
        </section>
        <section className="section">
          <h2>Govt. Policy & Scheme</h2>
          <div className="policies-schemes">
            <div className="policies">Policies</div>
            <div className="schemes">Schemes</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;