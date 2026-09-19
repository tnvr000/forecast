const BASE_URL = 'https://geocoding-api.open-meteo.com/v1';

/**
 * Search for locations matching the given term.
 *
 * @param {string} searchTerm
 * @returns {Promise<Location[]>}
 */
export async function searchCoordinates(searchTerm) {
  const url = new URL(`${BASE_URL}/search`);

  url.searchParams.set('name', searchTerm);
  url.searchParams.set('count', 10);
  url.searchParams.set('language', 'en');
  url.searchParams.set('format', 'json');

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `OpenMeteo Geocoding request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return (data.results || []).map((result) => ({
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    timezone: result.timezone,
    admin1: result.admin1,
    admin2: result.admin2,
    admin3: result.admin3,
    admin4: result.admin4,
  }));
}
