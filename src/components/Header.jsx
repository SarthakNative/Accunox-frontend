import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import { setSearchQuery } from '../slices/dashboardSlice'; // Adjust path as needed

export default function Header() {
  const categories = useSelector(state => state.dashboard.categories);
  const widgets = useSelector(state => state.dashboard.widgets);
  const searchQuery = useSelector(state => state.dashboard.searchQuery); // Get from Redux
  const dispatch = useDispatch();

  const handleSearchChange = (value) => {
    dispatch(setSearchQuery(value)); // Update Redux state
  };

  return (
    <header className="w-full bg-gray-50 border-b border-gray-200">
  <div className="px-4 sm:px-6 py-3">
    {/* Mobile Layout */}
    <div className="lg:hidden">
      <div className="flex items-center justify-between">
        {/* Left: Menu button and abbreviated breadcrumb */}
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-200 rounded-md transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">Dashboard V2</span>
        </div>

        {/* Right: Essential actions */}
        <div className="flex items-center space-x-2">
          {/* Search toggle for mobile */}
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Notification icon */}
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors relative">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* User avatar */}
          <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar - Can be toggled */}
      <div className="mt-3">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
      </div>
    </div>

    {/* Desktop Layout */}
    <div className="hidden lg:flex items-center justify-between">
      {/* Left section - Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-400">›</span>
        <span className="text-gray-700 font-medium">Dashboard V2</span>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-2xl mx-8">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center space-x-4">
        {/* Dropdown button */}
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors">
          <span className="text-gray-700">Actions</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Notification icon */}
        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User avatar */}
        <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</header>
  );
}
