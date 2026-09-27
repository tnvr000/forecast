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
      condition: data.weather[0].main ?? 'Unknown',
      description: data.weather[0]?.description ?? '',
    },
    meta: {
      provider: 'openWeather',
      observedAt: data.dt
    },
  });
}
