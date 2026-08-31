import React from 'react'
import './SearchBar.css'
import {cities} from './CityList';
import AutoCompleteSearchBox from './AutoCompleteSearchBox';

class SearchBar extends React.Component {
  constructor(props) {
		super(props);
		
    this.handleOnClickShowDailyWeather = this.handleOnClickShowDailyWeather.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
  }

  handleOnClickShowDailyWeather() {
    this.props.toggleCurrentWeather(false)
  }
  suggestionSelected(cityName) {
    const city = cities.filter(city => (city.name === cityName))[0];
		this.props.changeLocation(city.lat, city.lon, city.name);
  }

  render() {
    return (
      <div className="search-bar-container">
        <AutoCompleteSearchBox
          defaultText={this.props.cityName}
          context={cities.map((item)=>(item.name))} 
          suggestionSelected={this.suggestionSelected}
        />
        <div className="daily-weather-show-container">
          <label className="daily-weather-show" onClick={this.handleOnClickShowDailyWeather}>&gt;</label>
        </div>
      </div>
    );
  }
}

export default SearchBar;
