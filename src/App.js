import React, {Component} from 'react';
import logo from './logo.svg';
import {forecast} from './response'
import DataExtractor from './DataExtractor'
import './App.css';
import {cities} from './CityList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <WeatherApp />
      </div>
    );
  }
}

class DateCard extends Component {
  constructor(props) {
    super(props);

     this.state = {
      forecast: forecast,
      dailyWeather: {
        date: null,
      },
      dateOffset: 0,
     };

     this.handleClickNextDate = this.handleClickNextDate.bind(this);
     this.handleClickPreviousDate = this.handleClickPreviousDate.bind(this);
     this.handleOnClickHideDailyWeather = this.handleOnClickHideDailyWeather.bind(this);
  }

  handleClickNextDate() {
		this.props.onClickChangeDate(1);
  }

  handleClickPreviousDate() {
    this.props.onClickChangeDate(-1);
  }
  handleOnClickHideDailyWeather() {
    this.props.toggleCurrentWeather(true);
  }

  render() {
    return (
      <div className="date-container">
        <div className="daily-weather-hide-container">
          <label className="daily-weather-hide" onClick={this.handleOnClickHideDailyWeather}>&lt;</label>
        </div>
        <div className="previous-date" onClick={this.handleClickPreviousDate} >
          {"<"}
        </div>
        <label className="date">{this.props.dailyWeather.date}</label>
        <div className="next-date" onClick={this.handleClickNextDate} >
          {">"}
        </div>
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityText: "Bhubaneswar",
    }

    this.handleOnClickShowDailyWeather = this.handleOnClickShowDailyWeather.bind(this);
    this.handleOnchangeCity = this.handleOnchangeCity.bind(this);
  }

  handleOnClickShowDailyWeather() {
    this.props.toggleCurrentWeather(false)
  }
  handleOnchangeCity(event) {
    let cityText = event.target.value;
    this.setState({cityText});
  }

  render() {
    console.log(cities);
    return (
      <div className="search-bar-container">
        <AutoCompleteSearchBox context={cities} />
        <div className="daily-weather-show-container">
          <label className="daily-weather-show" onClick={this.handleOnClickShowDailyWeather}>&gt;</label>
        </div>
      </div>
    );
  }
}

class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingCurrentWeather: true,
			currentWeather: {
        summary: null,
				date: null,
				temp: null,
			},
      dailyWeather: {
        date: null,
        summary: null,
        tempHigh: null,
        tempMax: null,
        tempLow: null,
        tempMin: null,
        humidity: null,
        windSpeed: null,
        uvIndex: null,
        sunriseTime: null,
        sunsetTime: null,
        moonPhase: null
      },
      dateOffset: 0,
		}
		
    this.changeDate = this.changeDate.bind(this);
    this.toggleCurrentWeather = this.toggleCurrentWeather.bind(this);
	}
	
	componentDidMount() {
		let dailyWeather = DataExtractor.getDailyWeather(forecast, this.state.dateOffset);
    let currentWeather = DataExtractor.getCurrentWeather(forecast);
    console.log(currentWeather);
    console.log(dailyWeather);
    this.setState({dailyWeather, currentWeather})
  }

  changeDate(number) {
    this.setState((state) => {
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
          toggleCurrentWeather={this.toggleCurrentWeather}
        />
      );

      content = (
        <CurrentWeather currentWeather = {this.state.currentWeather} />
      );
    } else {
      title = (
        <DateCard
          dailyWeather={this.state.dailyWeather}
          onClickChangeDate={this.changeDate}
          toggleCurrentWeather={this.toggleCurrentWeather}
          on
        />
      );

      content = (
        <DailyWeather dailyWeather={this.state.dailyWeather}/>
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

class CurrentWeather extends Component {
	render() {
		return (
			<div className="current-weather">
        <div className="current-weather-summary">
          <div className="current-weather-icon-container">
            icon
          </div>
          <div className="current-weather-summary-text">
            {this.props.currentWeather.summary}
          </div>
        </div>
				<div className="current-weather-info">
          <div className="info-container">
						<div className="info-label">
							Humidity
						</div>
						<div className="info-value">
							{this.props.currentWeather.humidity}
						</div>
					</div>
					<div className="info-container">
						<div className="info-label">
							Wind Speed
						</div>
						<div className="info-value">
							{this.props.currentWeather.windSpeed}
						</div>
					</div>
					<div className="info-container">
						<div className="info-label">
							Pressure
						</div>
						<div className="info-value">
							{this.props.currentWeather.pressure}
						</div>
					</div>
					
				</div>
        <div className="hourly-temp-chart-container"></div>
      </div>
		);
	}
}

class DailyWeather extends Component {
  render() {
    return (
      <div className="daily-weather">
        <div className="daily-weather-summary">
          {this.props.dailyWeather.summary}
        </div>
        <div className="info-container">
          <div className="info-label">
            Max Temp
          </div>
          <div className="info-value">
            {this.props.dailyWeather.tempMax}{' feels like '}
            {this.props.dailyWeather.appTempMax}{' at '}
            {this.props.dailyWeather.tempMaxTime}
          </div>

          <div className="info-label">
            Min Temp
          </div>
          <div className="info-value">
            {this.props.dailyWeather.tempMin}{' feels like '}
            {this.props.dailyWeather.appTempMin}{' at '}
            {this.props.dailyWeather.tempMinTime}
          </div>

          <div className="info-label">
            Humidity
          </div>
          <div className="info-value">
            {this.props.dailyWeather.humidity}
          </div>
          

        </div>
      </div>
    );
  }
}

class AutoCompleteSearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: ["Delhi", "Jaipur"],
      text: "Bhubaneswar"
    }

    this.handleOnChangeText = this.handleOnChangeText.bind(this);
  }

  handleOnChangeText(event) {
    const text = event.target.value;
    const regex = new RegExp(text, "i");
    const suggestions = this.props.context.filter(item => (regex.test(item)));
    this.setState({text, suggestions})

  }

  render() {
    const { text, suggestions } = this.state
    const list = suggestions.map((item) => (<li>{item}</li>))
    return (
      <div>
        <input 
          type="text"
          value={text}
          onChange={this.handleOnChangeText}
        />
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

// let loadWeather = new Promise(function(resolve) {
//   let request = new XMLHttpRequest();
//   request.onreadystatechange = function() {
//     if(this.readyState === 4 && this.status === 200) {
//       let data = JSON.parse(this.responseText);
//       resolve(data);
//     }
//   }
//   let api = 'f8284a4a78a88495ffa48f544b8ab846';
//   let lat = '20';
//   let lon = '86';
//   request.open('get', `/forecast/${api}/${lat},${lon}`, true);
//   let p = request.send();
//   console.log(p);
// });

export default App;
