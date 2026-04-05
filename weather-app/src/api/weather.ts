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

export async function getWeatherByCity(city: string): Promise<Weather> {
  // 1. Geocoding: ciudad → coordenadas
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );

  if (!geoRes.ok) throw new Error("Error conectando con el servicio de ubicación.");

  const geoData: GeoResult = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`No se encontró ninguna ciudad llamada "${city}". Intenta con otro nombre.`);
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // 2. Clima: coordenadas → datos
  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );

  if (!weatherRes.ok) throw new Error("Error obteniendo los datos del clima.");

  const weatherData: WeatherResponse = await weatherRes.json();

  return {
    temperature: weatherData.current_weather.temperature,
    windspeed: weatherData.current_weather.windspeed,
    city: name,
    country,
  };
}