import React from 'react'

class DailyWeather extends React.Component {
  render() {
    return (
      <div className="daily-weather">
        <div className="daily-weather-summary">
          {this.props.dailyWeather.summary}
        </div>
        <div className="info-container">
          <div className="info-label">
            Max Temp
          </div>
          <div className="info-value">
            {this.props.dailyWeather.tempMax}{' feels like '}
            {this.props.dailyWeather.appTempMax}{' at '}
            {this.props.dailyWeather.tempMaxTime}
          </div>

          <div className="info-label">
            Min Temp
          </div>
          <div className="info-value">
            {this.props.dailyWeather.tempMin}{' feels like '}
            {this.props.dailyWeather.appTempMin}{' at '}
            {this.props.dailyWeather.tempMinTime}
          </div>

          <div className="info-label">
            Humidity
          </div>
          <div className="info-value">
            {this.props.dailyWeather.humidity}
          </div>
          

        </div>
      </div>
    );
  }
}

export default DailyWeather;