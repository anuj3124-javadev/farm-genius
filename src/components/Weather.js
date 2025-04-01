import React, { useState } from "react";
import "../styles.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherdata] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    const apiUrl = `https://ml.productsscout.xyz/api/weather-update/`; // Ensure this is correct

    try {
      const response = await fetch(apiUrl, {
        method: "POST", // Change to "GET" if needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: "Moradabad",
        }),
      });

      if (!response.ok) {
        alert("Response is not Ok")
        throw new Error("City not found or API error!");
      }else{alert("Response is Ok")}

      const data = await response.json();
      setWeatherdata(data);
      console.log(await data);
      setError(null);
      alert("Everything is going perfect");
    } catch (error) {
      alert("Error");
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Try again.");
      setWeatherdata(null);
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

      {weatherdata && (
        <div className="weather-info">
          <h2 className="weather-city">{weatherdata.location}</h2>
          {/* <p className="weather-description">{weatherdata.weather?.[0]?.description}</p> */}
          <div className="weather-details">
          <p><span className=".weather-span1">Date:</span><span className="weather-span2">{weatherdata.daily_forecast[0]?.date}</span></p>
          <p><span className=".weather-span1">Max-Temp:</span><span className="weather-span2">{weatherdata.daily_forecast[0]?.max_temp}</span></p>
          <p><span className=".weather-span1">Min-Temp:</span><span className="weather-span2">{weatherdata.daily_forecast[0]?.min_temp}</span></p>
          <p><span className=".weather-span1">UV-Index:</span><span className="weather-span2">{weatherdata.daily_forecast[0]?.uv_index}</span></p>
          <p><span className=".weather-span1">Precipitation:</span><span className="weather-span2">{weatherdata.daily_forecast[0]?.precipitation}</span></p>

            {/* <p>Humidity: {weatherdata.main?.humidity}%</p>
            <p>Wind Speed: {weatherdata.wind?.speed} m/s</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
