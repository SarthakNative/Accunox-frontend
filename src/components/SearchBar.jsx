export default function SearchBar({ value, onChange }) {
  // Ensure value is always a string
  const displayValue = value || '';
  
  return (
    <div className="relative flex items-center w-full">
      <input
        className="w-full px-4 py-2 pr-20 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
        placeholder="Search anything..."
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
      />
      {displayValue && (
        <button
          className="absolute right-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
          onClick={() => onChange('')}
        >
          Clear
        </button>
      )}
    </div>
  );
}