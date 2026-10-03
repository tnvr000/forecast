import React from 'react';
import './styles/HourlyWeather.css';

function HourlyWeather({ hourlyWeather }) {
  return (
    <div className="hourly-weather-card">
      <div className="hourly-weather-temp">
        {hourlyWeather.temperature}°C
      </div>

      <div className="hourly-weather-icon-container">
        {/* Weather icon will come later */}
      </div>

      <div className="hourly-weather-hour">
        {hourlyWeather.timestamp}
      </div>
    </div>
  );
}

export default HourlyWeather;
