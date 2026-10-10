import React from 'react';
import './styles/WeatherApp.css'
import CurrentWeather from './CurrentWeather';
import DailyWeather from './DailyWeather';
import DateCard from './DateCard';
import AutoCompleteSearchBox from '../../components/SearchBar/AutoCompleteSearchBox';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingCurrentWeather: true,
			dateOffset: 1,
		}
		
    this.changeDate = this.changeDate.bind(this);
    this.toggleCurrentWeather = this.toggleCurrentWeather.bind(this);
	}

  changeDate(number) {
    this.setState((state) => {
      const maxDateOffset = this.props.dailyWeather.daily.length - 1;

      const dateOffset = Math.min(
        Math.max(state.dateOffset + number, 1),
        maxDateOffset
      );

      return { dateOffset };
    });
  }

  toggleCurrentWeather(showingCurrentWeather) {
    this.setState({showingCurrentWeather});
  }

  render() {
    let title, content;

    if(this.state.showingCurrentWeather) {
      title = (
				<AutoCompleteSearchBox
					defaultText={this.props.location.name}
          suggestionSelected={this.props.updateLocation}
        />
      );

      content = ( this.props.currentWeather &&
        <CurrentWeather
          currentWeather = {this.props.currentWeather?.current}
          hourlyWeather = {this.props.hourlyWeather?.hourly}
        />
      );
    } else {
      const dailyWeather = this.props.dailyWeather.daily;

      title = (
        <DateCard
          dailyWeather={dailyWeather[this.state.dateOffset]}
          onClickChangeDate={this.changeDate}
          toggleCurrentWeather={this.toggleCurrentWeather}
          hasPreviousDate={this.state.dateOffset > 1}
          hasNextDate={this.state.dateOffset < dailyWeather.length - 1}
        />
      );

      content = (
        <DailyWeather dailyWeather={dailyWeather[this.state.dateOffset]} />
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