// Category.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';
import { Plus } from 'lucide-react';
import { setShowCategoryManager } from '../slices/dashboardSlice';

export default function Category({ category }) {
  const [showModal, setShowModal] = useState(false);
  const widgets = useSelector(state => state.dashboard.widgets);
  const dispatch =useDispatch();
  // map widgetIds to actual widget objects in the order specified
  const widgetList = category.widgetIds
    .map(wid => widgets.find(w => w.id === wid))
    .filter(Boolean);

  // small inner component for the "Add Widget" card
  const AddWidgetCard = () => (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setShowModal(true)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowModal(true); }}
      className="flex items-center justify-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6 lg:min-w-[350px] xl:min-w-[400px]"
    >
     <button
            className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-gray-900 transition-colors border px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm flex-1 sm:flex-initial justify-center sm:justify-start bg-white"
            onClick={() => {
              dispatch(setShowCategoryManager(!showCategoryManager));
            }}
          >
            <span className="text-xs sm:text-sm font-medium">Add Widget</span>
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
    </div>
  );

  return (
    <div className="bg-[#f0f5fa]">
      <div className="category-header flex items-center justify-between p-5">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        {/* kept header for title / other actions if you want them */}
      </div>

      <div className="grid grid-cols-3 gap-4 p-5">
          <>
            {widgetList.map(w => (
              <WidgetCard key={w.id} widget={w} categoryId={category.id} />
            ))}
            {/* always render the add card as the last grid item */}
            <AddWidgetCard />
          </>
      </div>

      {showModal && <AddWidgetModal categoryId={category.id} onClose={() => setShowModal(false)} />}
    </div>
  );
}
