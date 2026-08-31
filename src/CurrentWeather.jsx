import React from 'react';
import './CurrentWeather.css'
import ScrollBar from './ScrollBar';

class CurrentWeather extends React.Component {
	render() {
		return (
			<div className="current-weather">
				<div className="current-weather-summary">
          <div className="current-weather-icon-container">
						<img 
							src={this.props.currentWeather.icon}
							alt={this.props.currentWeather.iconName}
						/>
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
				<div id="hourlyWeatherContainer">
					{
						this.props.currentWeather.hourlyWeather.map((item) => {
							return (<HourlyWeatherCard key={item.time} hourlyWeather={item} />);
						})
					}
				</div>
				<ScrollBar for="hourlyWeatherContainer" />
			</div>
		);
	}
}

class HourlyWeatherCard extends React.Component {
	render() {
		return (
			<div className="hourly-weather-card">
				<div className="hourly-weather-temp">
					{this.props.hourlyWeather.temp}
				</div>
				<div className="hourly-weather-icon-container">
					<img
						className="hourly-weather-icon"
						src={this.props.hourlyWeather.icon}
						alt={this.props.hourlyWeather.iconName}
					/>
				</div>
				<div className="hourly-weather-hour">
					{this.props.hourlyWeather.time}
				</div>
			</div>
		);
	}
}

export default CurrentWeather;