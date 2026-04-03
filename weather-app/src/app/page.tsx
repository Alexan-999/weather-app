"use client";
import Image from "next/image";
import WeatherCard from "@/components/WeatherCard";
import SearchBar from "@/components/SearchBar";


// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-evenly py-32 px-16 bg-white dark:bg-black sm:items-start">
   
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//                     Weather App 🌤️
//           </h1>
//           <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Find your city and avoid any more surprises over Whether!        
//           </p>
//         </div>

//         <SearchBar onSearch={(city) => console.log(`Searching for weather in ${city}...`)} />

//         <WeatherCard />

//       </main>
//     </div>
//   );
// }




import { useEffect, useState } from "react";

type WeatherData = {
  temperature: number;
  windspeed: number;
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      // Ciudad: CDMX (puedes cambiar lat/lon)
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=19.43&longitude=-99.13&current_weather=true"
      );

      if (!res.ok) {
        throw new Error("Error al obtener datos del clima");
      }

      const data = await res.json();

      setWeather({
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
      });
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Clima en CDMX 🌤️</h1>

      {loading && <p>Cargando clima...</p>}

      {error && (
        <p style={{ color: "red" }}>
          ⚠️ Error: {error}
        </p>
      )}

      {weather && !loading && (
        <div>
          <p>🌡️ Temperatura: {weather.temperature}°C</p>
          <p>💨 Viento: {weather.windspeed} km/h</p>
        </div>
      )}

      <button
        onClick={fetchWeather}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Refrescar clima
      </button>
    </main>
  );
}