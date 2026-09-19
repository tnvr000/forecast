import React from 'react'
import './SearchBar.css'
import AutoCompleteSearchBox from './AutoCompleteSearchBox';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClickShowDailyWeather = this.handleOnClickShowDailyWeather.bind(this);
  }

  handleOnClickShowDailyWeather() {
    this.props.toggleCurrentWeather(false)
  }

  render() {
    return (
      <div className="search-bar-container">
        <AutoCompleteSearchBox
          defaultText={this.props.cityName}
          suggestionSelected={this.props.updateLocation}
        />
        <div className="daily-weather-show-container">
          <label className="daily-weather-show" onClick={this.handleOnClickShowDailyWeather}>&gt;</label>
        </div>
      </div>
    );
  }
}

export default SearchBar;
