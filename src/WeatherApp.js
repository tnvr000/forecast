import React from 'react';
import './WeatherApp.css'
import DataExtractor from './DataExtractor';
import CurrentWeather from './CurrentWeather';
import DailyWeather from './DailyWeather';
import DateCard from './DateCard';
import SearchBar from './SearchBar';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      showingCurrentWeather: true,
			currentWeather: {
        summary: null,
				date: null,
				temp: null,
			},
      dailyWeather: {
        date: null,
        summary: null,
        tempHigh: null,
        tempMax: null,
        tempLow: null,
        tempMin: null,
        humidity: null,
        windSpeed: null,
        uvIndex: null,
        sunriseTime: null,
        sunsetTime: null,
        moonPhase: null
      },
			dateOffset: 0,
			cityName: "Bhubaneswar",
		}
		
    this.changeDate = this.changeDate.bind(this);
    this.toggleCurrentWeather = this.toggleCurrentWeather.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
	}

  changeDate(number) {
    this.setState((state) => {
      const forecast = this.props.forecast;
			let dateOffset = state.dateOffset + number;
			let maxDateOffset = forecast.daily.data.length;
			if(dateOffset >= 0 && dateOffset < maxDateOffset) {
				let dailyWeather = DataExtractor.getDailyWeather(forecast, dateOffset);
				return ({dailyWeather, dateOffset});
			} else {
				return null;
			}
    });
  }

  changeLocation(lat, lon, name) {
		this.props.updateLocation(lat, lon, name);
  }

  toggleCurrentWeather(showingCurrentWeather) {
    this.setState({showingCurrentWeather});
  }

  render() {
    const weatherData = this.props.forecast;
    if(weatherData === null) {
      return null;
		}
		const {showingCurrentWeather} = this.state;
		const cityName = this.props.cityName;
    let title, content;
    if(showingCurrentWeather) {
      const currentWeather = DataExtractor.getCurrentWeather(weatherData);
      title = (
				<SearchBar 
					cityName={cityName}
          toggleCurrentWeather={this.toggleCurrentWeather}
          changeLocation={this.changeLocation}

        />
      );

      content = (
        <CurrentWeather currentWeather = {currentWeather} />
      );
    } else {
      const {dateOffset} = this.state
      const dailyWeather = DataExtractor.getDailyWeather(weatherData, dateOffset);
      title = (
        <DateCard
          dailyWeather={dailyWeather}
          onClickChangeDate={this.changeDate}
          toggleCurrentWeather={this.toggleCurrentWeather}
          on
        />
      );

      content = (
        <DailyWeather dailyWeather={dailyWeather}/>
      );
    }
    return (
      <div className="weather-app">
        {title}
				{content}
      </div>
    );
  }
}

export default WeatherApp;