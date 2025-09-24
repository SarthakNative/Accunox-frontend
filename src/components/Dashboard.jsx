import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from './Category';
import CategoryManager from './CategoryManager';
import { setShowCategoryManager } from '../slices/dashboardSlice';

export default function Dashboard() {
  const categories = useSelector(state => state.dashboard.categories);
  const widgets = useSelector(state => state.dashboard.widgets);
  const showCategoryManager = useSelector(state => state.dashboard.showCategoryManager);
  const searchQuery = useSelector(state => state.dashboard.searchQuery); // Get from Redux
  const dispatch = useDispatch();

  return (
    <div className="dashboard-container">
      {/* Remove the SearchBar from Dashboard since it's now in Header */}
      
      <CategoryManager 
        isOpen={showCategoryManager} 
        onClose={() => dispatch(setShowCategoryManager(false))}
      />
      
      {/* Search results */}
      {searchQuery && searchQuery.trim() ? (
        <SearchResults q={searchQuery} widgets={widgets} categories={categories} />
      ) : (
        <div className="categories-grid">
          {categories.map(cat => (
            <Category key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchResults({ q, widgets, categories }) {
  // Add safety check
  if (!q || typeof q.trim !== 'function') {
    return null;
  }

  const ql = q.toLowerCase().trim();
  const results = widgets.filter(
    w => w.title.toLowerCase().includes(ql) || w.text.toLowerCase().includes(ql)
  );

  if (results.length === 0) {
    return <div className="no-results p-4 text-center text-gray-500">No widgets found for "{q}"</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Search results for "{q}"</h3>
      <div className="search-results grid gap-4">
        {results.map(w => (
          <div key={w.id} className="search-item p-4 bg-white rounded-lg shadow border">
            <h4 className="font-medium text-lg text-gray-900">{w.title}</h4>
            <p className="text-gray-600 mt-2">{w.text}</p>
            <div className="meta text-sm text-gray-500 mt-3">
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