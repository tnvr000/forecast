import React from 'react';

class DateCard extends React.Component {
  constructor(props) {
    super(props);

     this.state = {
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

export default DateCard;