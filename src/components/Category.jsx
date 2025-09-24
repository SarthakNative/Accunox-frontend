// Category.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WidgetCard from './WidgetCard';
import AddWidgetModal from './AddWidgetModal';

export default function Category({ category }) {
  const [showModal, setShowModal] = useState(false);
  const widgets = useSelector(state => state.dashboard.widgets);
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
      className="max-w-sm flex items-center justify-center bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6"
    >
      <div className="text-center">
        <div className="text-2xl font-bold">+ Add</div>
        <div className="text-sm text-gray-500">Add a new widget</div>
      </div>
    </div>
  );

  return (
    <div className="bg-blue-200 pb-20">
      <div className="category-header flex items-center justify-between p-5">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        {/* kept header for title / other actions if you want them */}
      </div>

      <div className="grid grid-cols-3 gap-4 p-5">
        {widgetList.length ? (
          <>
            {widgetList.map(w => (
              <WidgetCard key={w.id} widget={w} categoryId={category.id} />
            ))}
            {/* always render the add card as the last grid item */}
            <AddWidgetCard />
          </>
        ) : (
          <>
            {/* when no widgets show a helpful empty message PLUS the add card */}
            <div className="col-span-3 text-center py-8 text-gray-600">No widgets in this category</div>
            <AddWidgetCard />
          </>
        )}
      </div>

      {showModal && <AddWidgetModal categoryId={category.id} onClose={() => setShowModal(false)} />}
    </div>
  );
}
