import React, { useState } from 'react';
import "../styles.css"; 

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    if (!city) return;

    const apiKey = 'YOUR_API_KEY'; // our API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setWeatherData(null);
        alert('City not found!');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">Weather Forecast</h1>

      <div className="weather-search-box">
        <input
          type="text"
          className="weather-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="weather-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {weatherData && (
        <div className="weather-info">
          <h2 className="weather-city">{weatherData.name}</h2>
          <p className="weather-description">{weatherData.weather[0].description}</p>
          <div className="weather-details">
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
