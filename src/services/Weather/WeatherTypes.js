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
 * @typedef {Object} DailyForecast
 * @property {string} date
 * @property {number} minTemperature
 * @property {number} maxTemperature
 * @property {string} condition
 */

/**
 * @typedef {Object} Forecast
 * @property {DailyForecast[]} daily
 */

/**
 * @typedef {Object} WeatherData
 * @property {Location} location
 * @property {Position} position
 * @property {CurrentWeather} current
 * @property {Forecast} forecast
 * @property {string} provider
 * @property {number} fetchedAt
 */
