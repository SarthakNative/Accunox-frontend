export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex items-center w-full">
      <input
        className="w-full px-4 py-2 pr-20 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
        placeholder="Search anything..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
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