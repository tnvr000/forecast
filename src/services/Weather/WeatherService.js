import * as OpenWeather from './Providers/OpenWeather';

const providers = {
  openWeather: OpenWeather,
};

export async function getCurrentWeather(provider, latitude, longitude) {
  const weatherProvider = providers[provider];

  if (!weatherProvider) {
    throw new Error(`Unknown weather Provider: ${provider}`);
  }

  return weatherProvider.getCurrentWeather(latitude, longitude)
}

export function getAvailableProviders() {
  return Object.keys(providers)
}
