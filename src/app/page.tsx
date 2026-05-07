"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorCard from "./components/ErrorCard";
import { CityNotFoundError, NetworkError, getWeatherByCity } from "@/api/weather";
import { Weather } from "@/api/types/weatherType";
import { ErrorType } from "./components/ErrorCard";
import ForecastCard from "./components/ForecastCard";
import AnimatedContainer from "./components/AnimatedContainer";

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);


const handleSearch = async (city: string) => {
  setIsLoading(true);
  setError(null);
  setErrorType(null);
  setWeather(null);

  try {
    const data = await getWeatherByCity(city);
    setWeather(data);
  } catch (err) {
    if (err instanceof CityNotFoundError) {
      setErrorType("not_found");
    } else if (err instanceof NetworkError) {
      setErrorType("network");
    } else {
      setErrorType("unknown");
    }
    setError(err instanceof Error ? err.message : "Unexpected error.");
  } finally {
    setIsLoading(false);
  }
};


  return (
  <div className="min-h-screen flex flex-col items-center justify-start bg-zinc-950 px-4 py-12 font-sans">
    <main className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Weather App 🌤️
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Find your city and avoid any more surprises over Whether!        
        </p>
      </div>
      
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      <div className="relative w-full min-h-[300px]">
        {/* Error */}
        <AnimatedContainer show={!!error}>
          {error && errorType && <ErrorCard message={error} type={errorType} />}
        </AnimatedContainer>

        {/* Weather */}
        <AnimatedContainer show={!!weather}>
          {weather && <WeatherCard weather={weather} />}
        </AnimatedContainer>

        {/* Forecast */}
        <AnimatedContainer show={!!weather}>
          {weather && <ForecastCard forecast={weather.forecast} />}
        </AnimatedContainer>
      </div>

    </main>
  </div>
    
  );
}