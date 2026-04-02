export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter a city..."
        className="border p-2 rounded"
      />
      <button className="bg-white text-black px-4 rounded">
        Search
      </button>
    </div>
  );
}