export interface ForecastDay {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  weathercode: number;
}

export interface Weather {
  temperature: number;
  windspeed: number;
  city: string;
  country: string;
  forecast: ForecastDay[];
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
    weathercode: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[]; 
  };
};

const cache = new Map<string, { data: Weather; timestamp: number }>();

function getFromCache(city: string): Weather | null {
  const record = cache.get(city.toLowerCase());

  if (!record) return null;

  const ONE_HOUR = 1000 * 60 * 60;

  if (Date.now() - record.timestamp < ONE_HOUR) {
    return record.data;
  }

  return null;
}

function saveToCache(city: string, data: Weather) {
  cache.set(city.toLowerCase(), {
    data,
    timestamp: Date.now(),
  });
}

export class CityNotFoundError extends Error {
  constructor(city: string) {
    super(`We couldn't find "${city}". Check the name and try again.`);
    this.name = "CityNotFoundError";
  }
}

export class NetworkError extends Error {
  constructor() {
    super("No connection. Check your internet and try again.");
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
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
);

  if (!res.ok) throw new NetworkError();

  return res.json() as Promise<WeatherResponse>;
}

function mapForecast(data: WeatherResponse["daily"]) {
  return data.time.slice(0, 5).map((date, index) => ({
    date,
    maxTemperature: data.temperature_2m_max[index],
    minTemperature: data.temperature_2m_min[index],
    weathercode: data.weathercode[index],
  }));
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

  const cached = getFromCache(city);
  if (cached) {
    console.log("Using cache");
    return cached;
  }

  const { latitude, longitude, name, country } = await getCoordinates(city);
  const weatherData = await getWeather(latitude, longitude);
  
  const result: Weather = {
    temperature: weatherData.current_weather.temperature,
    windspeed: weatherData.current_weather.windspeed,
    city: name,
    country,
    forecast: mapForecast(weatherData.daily),
  };

  saveToCache(city, result);

  return result;

}