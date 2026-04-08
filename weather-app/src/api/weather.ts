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

/**
 * Fetches the current weather information for a given city.
 *
 * This function first retrieves geographic coordinates (latitude and longitude)
 * for the specified city using the Open-Meteo Geocoding API. Then, it uses those
 * coordinates to fetch the current weather data from the Open-Meteo Weather API.
 *
 * @param {string} city - The name of the city to retrieve weather data for.
 *
 * @returns {Promise<Weather>} A promise that resolves to a Weather object containing:
 * - temperature: The current temperature in degrees Celsius.
 * - windspeed: The current wind speed in km/h.
 * - city: The resolved city name from the API.
 * - country: The country where the city is located.
 *
 * @throws {CityNotFoundError} If the specified city cannot be found.
 * @throws {NetworkError} If there is a problem with the network request.
 *
 * @example
 * ```ts
 * import { getWeatherByCity } from './getWeather';
 *
 * async function showWeather() {
 *   try {
 *     const weather = await getWeatherByCity('London');
 *     console.log(weather);
 *     // Output:
 *     // {
 *     //   temperature: 18.5,
 *     //   windspeed: 10.2,
 *     //   city: "London",
 *     //   country: "United Kingdom"
 *     // }
 *   } catch (error) {
 *     if (error instanceof CityNotFoundError) {
 *       console.error('City not found');
 *     } else {
 *       console.error('Network error');
 *     }
 *   }
 * }
 * ```
 */

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