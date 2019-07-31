import React from 'react';

class CurrentWeather extends React.Component {
	render() {
		return (
			<div className="current-weather">
        <div className="current-weather-summary">
          <div className="current-weather-icon-container">
            icon
          </div>
          <div className="current-weather-summary-text">
            {this.props.currentWeather.summary}
          </div>
        </div>
				<div className="current-weather-info">
          <div className="info-container">
						<div className="info-label">
							Humidity
						</div>
						<div className="info-value">
							{this.props.currentWeather.humidity}
						</div>
					</div>
					<div className="info-container">
						<div className="info-label">
							Wind Speed
						</div>
						<div className="info-value">
							{this.props.currentWeather.windSpeed}
						</div>
					</div>
					<div className="info-container">
						<div className="info-label">
							Pressure
						</div>
						<div className="info-value">
							{this.props.currentWeather.pressure}
						</div>
					</div>
					
				</div>
        <div className="hourly-temp-chart-container"></div>
      </div>
		);
	}
}

export default CurrentWeather;