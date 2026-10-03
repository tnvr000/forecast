import React from 'react';
import './styles/DailyWeather.css';

class DailyWeather extends React.Component {
  render() {
    const { dailyWeather } = this.props;

    return (
      <div className="daily-weather">
        <div className="daily-weather-summary">
          {dailyWeather.condition}
        </div>

        <div className="info-container">
          <div className="info-label">
            Maximum Temperature
          </div>

          <div className="info-value">
            {dailyWeather.maxTemperature}°C
          </div>

          <div className="info-label">
            Minimum Temperature
          </div>

          <div className="info-value">
            {dailyWeather.minTemperature}°C
          </div>
        </div>
      </div>
    );
  }
}

export default DailyWeather;
