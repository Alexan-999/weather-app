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

export async function getWeatherByCity(city: string): Promise<Weather> {
  let geoData: GeoResult;

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    geoData = await geoRes.json();
  } catch {
    throw new NetworkError();
  }

  if (!geoData.results || geoData.results.length === 0) {
    throw new CityNotFoundError(city);
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  let weatherData: WeatherResponse;

  try {
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    weatherData = await weatherRes.json();
  } catch {
    throw new NetworkError();
  }

  return {
    temperature: weatherData.current_weather.temperature,
    windspeed: weatherData.current_weather.windspeed,
    city: name,
    country,
  };
}