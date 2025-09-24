import { useState } from 'react';
import SearchBar from './SearchBar'; // Adjust the import path as needed
import { useSelector } from 'react-redux';
import Category from './Category';

export default function Header() {
  const categories = useSelector(state => state.dashboard.categories);
  const widgets = useSelector(state => state.dashboard.widgets);
  const [searchQuery, setSearchQuery] = useState('');

    {/* Search results */}
        {searchQuery.trim() ? (
          <SearchResults q={searchQuery} widgets={widgets} categories={categories} />
        ) : (
          <div className="categories-grid">
            {categories.map(cat => (
              <Category key={cat.id} category={cat} />
            ))}
          </div>
        )}

  return (
    <header className="w-full bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left section - Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-500">Home</span>
          <span className="text-gray-400">›</span>
          <span className="text-gray-700 font-medium">Dashboard V2</span>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
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
    </header>
  );
}

function SearchResults({ q, widgets, categories }) {
  const ql = q.toLowerCase().trim();
  const results = widgets.filter(
    w => w.title.toLowerCase().includes(ql) || w.text.toLowerCase().includes(ql)
  );

  if (results.length === 0) {
    return <div className="no-results">No widgets found for "{q}"</div>;
  }

  return (
    <div>
      <h3>Search results for "{q}"</h3>
      <div className="search-results">
        {results.map(w => (
          <div key={w.id} className="search-item">
            <h4>{w.title}</h4>
            <p>{w.text}</p>
            <div className="meta">
              Categories:{' '}
              {w.categoryIds.length
                ? w.categoryIds
                    .map(cid => categories.find(c => c.id === cid)?.name || cid)
                    .join(', ')
                : '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
