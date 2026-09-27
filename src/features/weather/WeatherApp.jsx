import React from 'react';
import './WeatherApp.css'
import CurrentWeather from './CurrentWeather';
import DailyWeather from '../../DailyWeather';
import DateCard from '../../DateCard';
import SearchBar from '../../components/SearchBar/SearchBar';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingCurrentWeather: true,
			dateOffset: 0,
		}
		
    this.changeDate = this.changeDate.bind(this);
    this.toggleCurrentWeather = this.toggleCurrentWeather.bind(this);
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

  toggleCurrentWeather(showingCurrentWeather) {
    this.setState({showingCurrentWeather});
  }

  render() {
    let title, content;
    if(this.state.showingCurrentWeather) {
      title = (
				<SearchBar 
					cityName={this.props.location.name}
          toggleCurrentWeather={this.toggleCurrentWeather}
          updateLocation={this.props.updateLocation}

        />
      );

      content = ( this.props.currentWeather &&
        <CurrentWeather currentWeather = {this.props.currentWeather.current} />
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