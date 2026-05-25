"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorCard from "./components/ErrorCard";
import {
  AmbiguousCityError,
  CityNotFoundError,
  GeoCandidate,
  NetworkError,
  getWeatherByCity,
  getWeatherByCoordinates,
} from "@/api/weather";
import { Weather } from "@/api/types/weatherType";
import { ErrorType } from "./components/ErrorCard";
import ForecastCard from "./components/ForecastCard";
import AnimatedContainer from "./components/AnimatedContainer";

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [ambiguousQuery, setAmbiguousQuery] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<GeoCandidate[] | null>(null);

  const resetResults = () => {
    setError(null);
    setErrorType(null);
    setWeather(null);
    setAmbiguousQuery(null);
    setCandidates(null);
  };

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    resetResults();

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      if (err instanceof AmbiguousCityError) {
        setAmbiguousQuery(city);
        setCandidates(err.candidates);
        return;
      }

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

  const handlePickCandidate = async (candidate: GeoCandidate) => {
    setIsLoading(true);
    setError(null);
    setErrorType(null);
    setWeather(null);

    try {
      const data = await getWeatherByCoordinates(candidate);
      setWeather(data);
      setAmbiguousQuery(null);
      setCandidates(null);
    } catch (err) {
      if (err instanceof NetworkError) {
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
          {/* Ambiguous city picker */}
          <AnimatedContainer show={!!candidates?.length}>
            {ambiguousQuery && candidates?.length ? (
              <div className="w-full max-w-md animate-fade-in">
                <div className="rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    Multiple matches for "{ambiguousQuery}"
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
                    Please choose the correct location:
                  </p>

                  <div className="flex flex-col gap-2">
                    {candidates.map((c) => {
                      const key = `${c.name}-${c.country}-${c.latitude}-${c.longitude}`;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handlePickCandidate(c)}
                          className="w-full text-left rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 px-4 py-3 transition"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                {c.name}
                              </p>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                                {c.country}
                              </p>
                            </div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
                              {c.latitude.toFixed(2)}, {c.longitude.toFixed(2)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </AnimatedContainer>

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
