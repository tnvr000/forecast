var DataExtractor = {
    days: {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
    },
    months: {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec',
    },
    // icons: {
    //     'Clear': Clear,
    //     'Clouds': Clouds,
    //     'PartlyClouds': PartlyClouds,
    //     'Rain': Rain,
    //     'Thunderstorm': Thunderstorm,
    // },
    getCurrentWeather: function(forecast) {
        let rawData = forecast.currently;
        let data = {};
        data.date = (new Date(rawData.time * 1000));
        data.summary = rawData.summary;
        data.pressure = rawData.pressure;
        data.humidity = rawData.humidity;
        data.windSpeed = rawData.windSpeed;
        data.temp = rawData.apparentTemperature;
        data.hourlyWeather = this.getHourlyData(forecast);
        return data;
    },
    getHourlyData(forecast) {
        let todayDate = (new Date(forecast.currently.time * 1000)).getDate();
        let hourlyWeather = forecast.hourly.data;
        let data = [];
        for(let i = 0; i < hourlyWeather.length; ++i) {
            let date = new Date(hourlyWeather[i].time * 1000);
            if(date.getDate() !== todayDate) {
                break;
            }
            let datum = {};
            datum.time = date.getHours();
            datum.summary = hourlyWeather[i].summary;
            datum.icon = hourlyWeather[i].icon;
            datum.temp = hourlyWeather[i].temperature;
            data.push(datum); 
        }
        return data;
     },
    getDailyWeather: function(forecast, dateOffset) {
        let rawData = forecast.daily.data[dateOffset]
        let data = {};
        data.date = this.getDate((new Date(rawData.time * 1000)));
        data.summary = rawData.summary;
        data.tempMax = rawData.temperatureMax;
        data.tempMin = rawData.temperatureMin;
        data.appTempMax = rawData.apparentTemperatureMax;
        data.appTempMin = rawData.apparentTemperatureMin;
        data.tempMaxTime = this.getTime(new Date(rawData.temperatureMaxTime * 1000));
        data.tempMinTime = this.getTime(new Date(rawData.temperatureMinTime * 1000));
        data.humidity = rawData.humidity;
        data.windSpeed = rawData.windSpeed;
        data.uvIndex = rawData.uvIndex;
        data.sunriseTime = this.getTime(new Date(rawData.sunriseTime * 1000));
        data.sunsetTime = this.getTime(new Date(rawData.sunsetTime * 1000));
        data.moonPhase = rawData.moonPhase;


        return data;
    },
    getDay: function (date) {
        return this.days[date.getDay()];
    },
    getMonth: function (date) {
        return this.months[date.getMonth()];
    },
    getDate: function (date) {
        return `${this.getDay(date)}, ${date.getDate()} ${this.getMonth(date)}`;
    },
    getTime: function(date) {
			let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            [hours, minutes, seconds] = [hours, minutes, seconds].map(function(item) {
                return (item.toString().length === 1 ? "0" + item : "" + item);
            });
			return (`${hours}:${minutes}:${seconds}`);
    },
}

export default DataExtractor;