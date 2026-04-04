type WeatherResponse = {
  current_weather: {
    temperature: number;
    windspeed: number;
  };
};

export async function getWeatherByCoords(lat: number, lon: number) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );

  if (!res.ok) {
    throw new Error("Error fetching weather");
  }

  const data: WeatherResponse = await res.json();

  return {
    temperature: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
  };
}