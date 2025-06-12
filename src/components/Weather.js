// Weather.js
import React, { useState } from "react";
import '../styles.css';
import { useAppContext } from '../context/AppContext';

const Weather = () => {
  const { baseURL} = useAppContext();
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherdata] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    const apiUrl = `${baseURL}/api/weather-update/`;

    try {
      setLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: city }),
      });

      if (!response.ok) {
        throw new Error("City not found or API error!");
      }

      const data = await response.json();
      setWeatherdata(data);
      setError(null);
    } catch (error) {
      setError("Could not fetch weather data. Try again.");
      setWeatherdata(null);
    } finally {
      setLoading(false);
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

      {loading && <div className="loader">Loading...</div>}

      {error && <p className="weather-error">{error}</p>}

      {weatherdata && (
        <div className="weather-info">
          <h2 className="weather-city">{weatherdata.location}</h2>
          <div className="weather-details">
            {weatherdata.daily_forecast.slice(0, 10).map((day, index) => (
              <div className="weather-day-card" key={index}>
                <p><span className="weather-span1">Date:</span> <span className="weather-span2">{day.date}</span></p>
                <p><span className="weather-span1">Max Temp:</span> <span className="weather-span2">{day.max_temp} °C</span></p>
                <p><span className="weather-span1">Min Temp:</span> <span className="weather-span2">{day.min_temp} °C</span></p>
                <p><span className="weather-span1">UV Index:</span> <span className="weather-span2">{day.uv_index}</span></p>
                <p><span className="weather-span1">Precipitation:</span> <span className="weather-span2">{day.precipitation} mm</span></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;