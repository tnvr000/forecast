import React from 'react';
import './DateCard.css';

class DateCard extends React.Component {
  handleClickNextDate = () => {
    this.props.onClickChangeDate(1);
  };

  handleClickPreviousDate = () => {
    this.props.onClickChangeDate(-1);
  };

  handleOnClickHideDailyWeather = () => {
    this.props.toggleCurrentWeather(true);
  };

  render() {
    const { dailyWeather } = this.props;

    return (
      <div className="date-container">
        <button
          className="daily-weather-hide"
          onClick={this.handleOnClickHideDailyWeather}
        >
          &lt;
        </button>

        <button
          className="previous-date"
          onClick={this.handleClickPreviousDate}
          disabled={!this.props.hasPreviousDate}
        >
          &lt;
        </button>

        <div className="date">
          {dailyWeather.date}
        </div>

        <button
          className="next-date"
          onClick={this.handleClickNextDate}
          disabled={!this.props.hasNextDate}
        >
          &gt;
        </button>
      </div>
    );
  }
}

export default DateCard;
