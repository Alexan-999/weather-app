import { ForecastDay } from "@/api/types/weatherType";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export default function ForecastCard({ forecast }: { forecast: ForecastDay[] }) {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white">
          5-Day Forecast
        </h3>

        <div className="flex justify-between gap-2">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="flex flex-col items-center flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3"
            >
              <p className="text-xs text-zinc-500 mb-1">
                {formatDate(day.date)}
              </p>

              <p className="text-sm font-semibold text-zinc-800 dark:text-white">
                {day.maxTemperature}°
              </p>

              <p className="text-xs text-zinc-400">
                {day.minTemperature}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}