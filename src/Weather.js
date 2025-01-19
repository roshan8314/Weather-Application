// client/src/Weather.js
import React, { useState } from 'react';
import './weather.css';

function Weather() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=YOUR_API_KEY&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  };

  return (
    <div className="main-container">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.main && (
        <div className="weather-box">
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{new Date().toLocaleDateString()}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
