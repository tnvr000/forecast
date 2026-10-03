import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherApp from './features/weather/WeatherApp'
import { getCurrentWeather, getDailyWeather } from './services/Weather/WeatherService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWeather: null,
      dailyWeather: null,
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
      },
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

  loadWeather = async (location) => {
    const [currentWeather, dailyWeather] = await Promise.all([
      getCurrentWeather(
        'openWeather',
        location.latitude,
        location.longitude
      ),
      getDailyWeather(
        'openWeather',
        location.latitude,
        location.longitude
      ),
    ]);

    this.setState({
      currentWeather,
      dailyWeather,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <WeatherApp 
          location={this.state.location}
          currentWeather={this.state.currentWeather}
          dailyWeather={this.state.dailyWeather}
          updateLocation={this.updateLocation}
        />
      </div>
    );
  }
}

export default App;
