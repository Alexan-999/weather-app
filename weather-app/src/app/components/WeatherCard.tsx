import { Weather } from "@/api/types/weather";

export default function WeatherCard({ weather }: { weather: Weather | null }) {

  if (!weather) return null;

  return (
    <div className="w-64 h-40 bg-white text-black rounded-xl shadow-md flex flex-col items-center justify-center">
      <p>🌡️ {weather.temperature}°C</p>
      <p>💨 {weather.windspeed} km/h</p>
    </div>
  );
}