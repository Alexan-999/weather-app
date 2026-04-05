"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorCard from "./components/ErrorCard";
import { getWeatherByCity } from "@/api/weather";
import { Weather } from "@/api/types/weather";

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-evenly py-32 px-16 bg-white dark:bg-black sm:items-start">
  
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    Weather App 🌤️
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Find your city and avoid any more surprises over Whether!        
          </p>
        </div>

              <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && <ErrorCard message={error} />}
        {weather && <WeatherCard weather={weather} />}

      </main>
    </div>
    
  );
}