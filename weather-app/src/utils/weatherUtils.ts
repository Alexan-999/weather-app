export function getWeatherIcon(code: number) {
  if (code === 0) return "☀️"; // clear sky
  if (code === 1) return "🌤️"; // mainly clear
  if (code === 2) return "⛅"; // partly cloudy
  if (code === 3) return "☁️"; // overcast

  if ([45, 48].includes(code)) return "🌫️"; // fog
  if ([51, 53, 55].includes(code)) return "🌦️"; // drizzle
  if ([61, 63, 65].includes(code)) return "🌧️"; // rain
  if ([71, 73, 75].includes(code)) return "❄️"; // snow
  if ([95].includes(code)) return "⛈️"; // thunderstorm

  return "❓";
}