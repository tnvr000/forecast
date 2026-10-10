import React, {Component} from 'react';
import logo from './logo.svg';
import './assets/css/App.css'
import WeatherApp from './features/weather/WeatherApp'
import { getCurrentWeather, getDailyWeather, getHourlyWeather } from './services/Weather/WeatherService';
import { weatherBackgrounds } from './utils/backgrounds';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      background: null,
      currentWeather: null,
      hourlyWeather: null,
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
    const [currentWeather, hourlyWeather, dailyWeather] = await Promise.all([
      getCurrentWeather(
        'openWeather',
        location.latitude,
        location.longitude,
      ),
      getHourlyWeather(
        'openWeather',
        location.latitude,
        location.longitude,
      ),
      getDailyWeather(
        'openWeather',
        location.latitude,
        location.longitude,
      ),
    ]);

    const timestamp = Math.floor(Date.now() / 1000);
    const isDay = timestamp >= currentWeather.current.sunrise && timestamp < currentWeather.current.sunset;
    const background = `${currentWeather.current.backgroundCondition}-${isDay ? 'day' : 'night'}-desktop`;

    this.setState({
      background,
      currentWeather,
      hourlyWeather,
      dailyWeather,
    });
  };

  render() {
    const backgroundImage = weatherBackgrounds[this.state.background];

    return (
      <div className="App" style={{ '--weather-background': `url(${backgroundImage})` }}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <WeatherApp 
          location={this.state.location}
          currentWeather={this.state.currentWeather}
          hourlyWeather={this.state.hourlyWeather}
          dailyWeather={this.state.dailyWeather}
          updateLocation={this.updateLocation}
        />
      </div>
    );
  }
}

export default App;
