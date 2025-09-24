import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from './Category';
import SearchBar from './SearchBar';
import CategoryManager from './CategoryManager';
import { setShowCategoryManager } from '../slices/dashboardSlice';


export default function Dashboard() {
  const categories = useSelector(state => state.dashboard.categories);
  const widgets = useSelector(state => state.dashboard.widgets);
  const showCategoryManager=useSelector(state=>state.dashboard.showCategoryManager);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch=useDispatch();
  return (
    <div className="dashboard-container">
      <div className="dashboard-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      {<CategoryManager isOpen={showCategoryManager} onClose={()=>{dispatch(setShowCategoryManager(false))}}/>}
      {/* Search results */}
      {searchQuery.trim() ? (
        <SearchResults q={searchQuery} widgets={widgets} categories={categories} />
      ) : (
        <div className="bg-yellow-500 mb-20">
          {categories.map(cat => (
            <Category key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
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
