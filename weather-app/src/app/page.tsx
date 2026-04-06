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
  <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12 font-sans">
    <main className="flex flex-col items-center gap-8 w-full max-w-md">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Weather App 🌤️
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
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