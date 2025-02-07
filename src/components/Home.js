import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles.css';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // // Sample crop data
  // const cropData = [
  //   { name: 'Wheat', price: 2500, increase: '5%' },
  //   { name: 'Rice', price: 3200, increase: '3%' },
  //   { name: 'Corn', price: 1800, increase: '7%' },
  //   { name: 'Sugarcane', price: 1500, increase: '2%' },
  // ];

  // // Line chart data for crop trends
  // const lineChartData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Months
  //   datasets: [
  //     {
  //       label: 'Wheat Price Trend',
  //       data: [2300, 2400, 2500, 2600, 2700, 2650, 2500], // Example data for Wheat
  //       borderColor: '#4CAF50', // Green line
  //       backgroundColor: 'rgba(76, 175, 80, 0.2)',
  //       tension: 0.4, // Smooth curve
  //     },
  //     {
  //       label: 'Rice Price Trend',
  //       data: [3100, 3150, 3200, 3250, 3300, 3270, 3200], // Example data for Rice
  //       borderColor: '#2196F3', // Blue line
  //       backgroundColor: 'rgba(33, 150, 243, 0.2)',
  //       tension: 0.4,
  //     },
  //   ],
  // };

  // // Line chart configuration
  // const lineChartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //   },
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: 'Months',
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: 'Price (₹)',
  //       },
  //       beginAtZero: false,
  //     },
  //   },
  // };

  return (
    <div>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="layout">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className={`home ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
          {/* <section className="section">
            <h2>Crop's Market</h2>
            <div className="crop-table">
              <table>
                <thead>
                  <tr>
                    <th>Crop Name</th>
                    <th>Current Price (₹)</th>
                    <th>Price Increase (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {cropData.map((crop, index) => (
                    <tr key={index}>
                      <td>{crop.name}</td>
                      <td>{crop.price}</td>
                      <td>{crop.increase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="graph">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </section> */}
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
    </div>
  );
};

export default Home;
