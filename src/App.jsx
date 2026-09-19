import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherApp from './features/weather/WeatherApp'
import { getCurrentWeather } from './services/Weather/WeatherService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      location: {
        name: 'Bhubaneswar',
        latitude: 20.27241,
        longitude: 85.83385,
        country: 'India',
        timezone: 'Asia/Kolkata',
        admin1: 'Odisha',
        admin2: 'Khordha',
        admin3: 'Bhubaneswar M Corp',
        admin4: '',
      }
    }

    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount() {
    this.loadWeather(this.state.location)
  }

  updateLocation(location) {
    this.setState({ location });
    this.loadWeather(location);
  }

  loadWeather = (location) => {
    getCurrentWeather('openWeather', location.latitude, location.longitude).then((res) => {
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
          cityName={this.state.location.name}
          forecast={this.state.forecast}
          updateLocation={this.updateLocation}
        />
      </div>
    );
  }
}

export default App;
