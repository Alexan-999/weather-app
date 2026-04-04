import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [city, setCity] = useState("");

  return (
    <div className="flex gap-2">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        type="text"
        placeholder="Enter a city..."
        className="border p-2 rounded"
      />
      <button
        onClick={() => onSearch(city)}
        className="bg-white text-black px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}