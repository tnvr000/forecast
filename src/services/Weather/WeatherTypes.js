/**
 * @typedef {Object} Location
 * @property {string} name
 * @property {string} country
 */

/**
 * @typedef {Object} Position
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {Object} Meta
 * @property {String} provider
 * @property {Number} observedAt
 */

/**
 * @typedef {Object} CurrentWeather
 * @property {number} temperature
 * @property {number} feelsLike
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {number} precipitation
 * @property {string} condition
 * @property {string} description
 */

/**
 * @typedef {Object} CurrentWeatherData
 * @property {Location} location
 * @property {Position} position
 * @property {CurrentWeather} current
 * @property {Meta} meta
 */

/**
 * @typedef {Object} DailyForecast
 * @property {string} date
 * @property {number} minTemperature
 * @property {number} maxTemperature
 * @property {string} condition
 */

/**
 * @typedef {Object} DailyForecastData
 * @property {Location} location
 * @property {Position} position
 * @property {DailyForecast[]} daily
 * @property {Meta} meta
 */

/**
 * @typedef {Object} HourlyForecast
 * @property {string} date
 * @property {number} minTemperature
 * @property {number} maxTemperature
 * @property {string} condition
 */

/**
 * @typedef {Object} HourlyForecastData
 * @property {Location} location
 * @property {Position} position
 * @property {HourlyForecast[]} hourly
 * @property {Meta} meta
 */
