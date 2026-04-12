"use client";

import { useState, KeyboardEvent } from "react";

export default function SearchBar({
  onSearch,
  isLoading,
}: {
  onSearch: (city: string) => void;
  isLoading: boolean;
}) {
  const [city, setCity] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && city.trim()) onSearch(city.trim());
  };

  return (
    <div className="flex w-full gap-3">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="City, country..."
        disabled={isLoading}
        className="flex-1 min-w-0 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 px-4 py-3 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition disabled:opacity-50"

      />
      <button
        onClick={() => city.trim() && onSearch(city.trim())}
        disabled={isLoading || !city.trim()}
        className="shrink-0 bg-sky-500 hover:bg-sky-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-2xl text-sm font-medium shadow-sm transition-all duration-150"

      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Searching
          </span>
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
}