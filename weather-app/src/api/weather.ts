export interface Weather {
  temperature: number;
  windspeed: number;
  city: string;
  country: string;
}

type GeoResult = {
  results?: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }[];
};

type WeatherResponse = {
  current_weather: {
    temperature: number;
    windspeed: number;
  };
};

export class CityNotFoundError extends Error {
  constructor(city: string) {
    super(`No encontramos "${city}". Verifica el nombre e intenta de nuevo.`);
    this.name = "CityNotFoundError";
  }
}

export class NetworkError extends Error {
  constructor() {
    super("Sin conexión. Revisa tu internet e intenta de nuevo.");
    this.name = "NetworkError";
  }
}

async function getCoordinates(city: string) {
  const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

  if (!res.ok) throw new NetworkError();

  const data: GeoResult = await res.json();

  if (!data.results?.length) {
    throw new CityNotFoundError(city);
  }

  return data.results[0];
}

async function getWeather(latitude: number, longitude: number) {
  const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

  if (!res.ok) throw new NetworkError();

  return res.json() as Promise<WeatherResponse>;
}

/**
 * Retrieves current weather information for a given city.
 *
 * This function resolves the geographic coordinates of the specified city
 * and then fetches the current weather data based on those coordinates.
 *
 * @param {string} city - The name of the city to retrieve weather data for.
 *
 * @returns {Promise<Weather>} A promise that resolves to a Weather object containing:
 * - temperature: The current temperature in degrees Celsius.
 * - windspeed: The current wind speed in km/h.
 * - city: The resolved city name.
 * - country: The country where the city is located.
 *
 * @throws {CityNotFoundError} If the specified city cannot be found.
 * @throws {NetworkError} If a network request fails while retrieving data.
 *
 * @example
 * ```ts
 * const weather = await getWeatherByCity('London');
 * console.log(weather.temperature);
 * ```
 */

export async function getWeatherByCity(city: string): Promise<Weather> {
   const { latitude, longitude, name, country } = await getCoordinates(city);
  const weatherData = await getWeather(latitude, longitude);
  
  return {
    temperature: weatherData.current_weather.temperature,
    windspeed: weatherData.current_weather.windspeed,
    city: name,
    country,
  };
}