import React, {Component, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherApp from './features/weather/WeatherApp'
import { getCurrentWeather } from './services/Weather/WeatherService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      currentWeather: null,
      lat: 20,
      lon: 86,
      name: "Bhubaneswar",
    }

    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount() {
    this.loadWeather(this.state.lat, this.state.lon)
  }

  updateLocation(lat, lon, name) {
    this.loadWeather(lat, lon)
  }

  loadWeather = (lat, lon) => {
  getCurrentWeather('openWeather', lat, lon).then((res) => {
    // console.log('App:res', res);
    this.setState({forecast: res})
  });
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <WeatherApp 
          cityName={this.state.name}
          forecast={this.state.forecast}
          updateLocation={this.updateLocation}
        />
      </div>
    );
  }
}

export default App;
