import { ForecastDay } from "@/api/types/weatherType";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export default function ForecastCard({ forecast }: { forecast: ForecastDay[] }) {
  return (
    <div className="w-full mt-4">
      <div className="
        rounded-3xl p-5
        bg-white/20
        backdrop-blur-xl
        border border-white/10
        shadow-lg
      ">
        <h3 className="text-white/80 text-sm font-semibold mb-4 tracking-wide">
          5-Day Forecast
        </h3>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="
                min-w-[70px]
                flex flex-col items-center
                bg-white/10
                rounded-xl p-3
                hover:bg-white/20
                transition
              "
            >
              <p className="text-xs text-white/60 mb-1">
                {formatDate(day.date)}
              </p>

              <p className="text-white font-semibold text-sm">
                {day.maxTemperature}°
              </p>

              <p className="text-white/50 text-xs">
                {day.minTemperature}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}