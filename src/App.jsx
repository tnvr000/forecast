import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherApp from './WeatherApp'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      lat: 20,
      lon: 86,
      name: "Bhubaneswar",
    }

    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount() {
    loadWeather(this.state.lat, this.state.lon).then((forecast) => {
      this.setState({forecast});
    });
  }

  updateLocation(lat, lon, name) {
    loadWeather(lat, lon).then((forecast) => {
      this.setState({forecast, lat, lon, name});
    })
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

function loadWeather(lat, lon) {
  return (new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        resolve(data);
      }
    }
    let api = 'f8284a4a78a88495ffa48f544b8ab846';
    request.open('get', `/forecast/${api}/${lat},${lon}`, true);
    request.send();
  }));
}

export default App;
