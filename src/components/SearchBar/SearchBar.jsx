import React from 'react'
import AutoCompleteSearchBox from './AutoCompleteSearchBox';
import './SearchBar.css'

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
