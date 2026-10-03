const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather from OpenWeather
 * 
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<CurrentWeatherData>}
 */
export async function getCurrentWeather(latitude, longitude) {
  const url = new URL(`${BASE_URL}/weather`);

  url.searchParams.set('lat', latitude);
  url.searchParams.set('lon', longitude);
  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', 'metric');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `OpenWeather request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return normalizeCurrentWeather(data);
}

/**
 * Fetch daily weather from OpenWeather
 * 
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns {Promise<DailyForecastData>}
 */
export async function getDailyWeather(latitude, longitude) {
  const data = await getForecastData(latitude, longitude);
  return normalizeDailyWeather(data);
}

/**
 * Fetch hourly weather from OpenWeather
 * 
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns {Promise<HourlyForecastData>}
 */
export async function getHourlyWeather(latitude, longitude) {
  const data = await getForecastData(latitude, longitude);
  return normalizeHourlyWeather(data);
}

/**
 * Fetch forecast from OpenWeather
 * 
 * @param {Number} latitude
 * @param {Number} longitude
 * @returns {Promise<Object>}
 */
async function getForecastData(latitude, longitude) {
  const url = new URL(`${BASE_URL}/forecast`);

  url.searchParams.set('lat', latitude);
  url.searchParams.set('lon', longitude);
  url.searchParams.set('appid', API_KEY);
  url.searchParams.set('units', 'metric');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `OpenWeather forecast request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * convert OpenWeather's response into our application's weather model
 * 
 * @param {Object} data
 * @returns {CurrentWeatherData}
 */
function normalizeCurrentWeather(data) {
  return ({
    location: {
      name: data.name,
      country: data.sys.country,
    },
    position: {
      latitude: data.coord.lat,
      longitude: data.coord.lon
    },
    current: {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      precipitation: data.rain?.['1h'] ?? 0,
      condition: data.weather[0]?.main ?? 'Unknown',
      description: data.weather[0]?.description ?? '',
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    },
    meta: {
      provider: 'openWeather',
      observedAt: data.dt
    },
  });
}

/**
 * convert OpenWeather's response into our application's weather model
 * 
 * @param {Object} data
 * @returns {DailyForecastData}
 */
function normalizeDailyWeather(data) {
  const dailyMap = {};

  for (const entry of data.list ?? []) {
    const date = entry.dt_txt.split(' ')[0];

    if (!dailyMap[date]) {
      dailyMap[date] = {
        date,
        minTemperature: entry.main.temp_min,
        maxTemperature: entry.main.temp_max,
        conditions: [],
      };
    }

    const day = dailyMap[date];
    day.minTemperature = Math.min(day.minTemperature, entry.main.temp_min);
    day.maxTemperature = Math.max(day.maxTemperature, entry.main.temp_max);
    day.conditions.push(entry.weather[0]?.main ?? 'Unknown');
  }

  return {
    location: {
      name: data.city.name,
      country: data.city.country,
    },
    position: {
      latitude: data.city.coord.lat,
      longitude: data.city.coord.lon,
    },
    daily: Object.values(dailyMap).map((day) => ({
      date: day.date,
      minTemperature: day.minTemperature,
      maxTemperature: day.maxTemperature,
      condition: getMostFrequentCondition(day.conditions),
    })),
    meta: {
      provider: 'openWeather',
      observedAt: data.list[0]?.dt ?? Math.floor(Date.now() / 1000),
    },
  };
}

/**
 * convert OpenWeather's response into our application's weather model
 * 
 * @param {Object} data
 * @returns {HourlyForecastData}
 */
function normalizeHourlyWeather(data) {
  const now = Math.floor(Date.now() / 1000);

  return {
    location: {
      name: data.city.name,
      country: data.city.country,
    },
    position: {
      latitude: data.city.coord.lat,
      longitude: data.city.coord.lon,
    },
    hourly: (data.list ?? [])
      .filter((entry) => entry.dt >= now)
      .slice(0, 8)
      .map((entry) => ({
        timestamp: entry.dt,
        temperature: entry.main.temp,
        condition: entry.weather[0]?.main ?? 'Unknown',
      })),
    meta: {
      provider: 'openWeather',
      observedAt: data.list[0]?.dt ?? now,
    },
  };
}

function getLocalDate(timezoneOffset) {
  const now = new Date(Date.now() + timezoneOffset * 1000);

  return now.toISOString().split('T')[0];
}

/**
 * Pick the most frequently occurring condition from a list of conditions.
 *
 * @param {string[]} conditions
 * @returns {string}
 */
function getMostFrequentCondition(conditions) {
  if (conditions.length === 0) {
    return 'Unknown';
  }

  const counts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])[0][0];
}
