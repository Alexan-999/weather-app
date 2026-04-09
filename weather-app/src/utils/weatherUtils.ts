export function getWeatherIcon(code: number) {
  if (code === 0) return "☀️"; // despejado
  if (code === 1) return "🌤️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";

  if ([45, 48].includes(code)) return "🌫️"; // niebla
  if ([51, 53, 55].includes(code)) return "🌦️"; // llovizna
  if ([61, 63, 65].includes(code)) return "🌧️"; // lluvia
  if ([71, 73, 75].includes(code)) return "❄️"; // nieve
  if ([95].includes(code)) return "⛈️"; // tormenta

  return "❓";
}