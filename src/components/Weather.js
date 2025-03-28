import React, { useState } from "react";
import "../styles.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    const apiUrl = `https://ml.productsscout.xyz/api/weather-update/?city=${city}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("City not found or API error!");
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Try again.");
      setWeatherData(null);
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

      {error && <p className="weather-error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2 className="weather-city">{weatherData.name}</h2>
          <p className="weather-description">{weatherData.weather?.[0]?.description}</p>
          <div className="weather-details">
            <p>Temperature: {weatherData.main?.temp}°C</p>
            <p>Humidity: {weatherData.main?.humidity}%</p>
            <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
