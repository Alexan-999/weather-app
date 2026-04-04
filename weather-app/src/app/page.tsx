"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeatherByCoords } from "@/api/weather";
import { Weather } from "@/api/types/weather";

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null);

  const handleSearch = async (city: string) => {
    console.log("Searching:", city);

    // ⚠️ temporal (luego hacemos geocoding real)
    const lat = 19.43;
    const lon = -99.13;

    const data = await getWeatherByCoords(lat, lon);
    setWeather(data);
  };

  return (
    <main>
      <SearchBar onSearch={handleSearch} />
      <WeatherCard weather={weather} />
    </main>
  );
}