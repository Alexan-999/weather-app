import { Weather } from "@/api/types/weather";

function getWeatherMood(temp: number) {
  if (temp >= 30) return { emoji: "☀️", label: "Caluroso", bg: "from-orange-400 to-rose-400" };
  if (temp >= 20) return { emoji: "🌤️", label: "Agradable", bg: "from-sky-400 to-blue-500" };
  if (temp >= 10) return { emoji: "🌥️", label: "Fresco", bg: "from-slate-400 to-blue-400" };
  return { emoji: "🧊", label: "Frío", bg: "from-blue-300 to-indigo-500" };
}

export default function WeatherCard({ weather }: { weather: Weather | null }) {
  if (!weather) return null;

  const mood = getWeatherMood(weather.temperature);

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${mood.bg} p-6 shadow-xl text-white`}>
        {/* Decorative circle */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-sm" />
        <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-white/5" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">Clima actual</p>
              <h2 className="text-2xl font-bold leading-tight">{weather.city}</h2>
              <p className="text-white/70 text-sm">{weather.country}</p>
            </div>
            <span className="text-4xl">{mood.emoji}</span>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Temperatura</p>
              <p className="text-3xl font-bold">{weather.temperature}°C</p>
              <p className="text-white/70 text-xs mt-1">{mood.label}</p>
            </div>
            <div className="flex-1 bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Viento</p>
              <p className="text-3xl font-bold">{weather.windspeed}</p>
              <p className="text-white/70 text-xs mt-1">km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}