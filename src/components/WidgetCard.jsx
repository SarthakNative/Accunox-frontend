import { useDispatch } from 'react-redux';
import { removeWidgetFromCategory, deleteWidget } from '../slices/dashboardSlice';

export default function WidgetCard({ widget, categoryId }) {
  const dispatch = useDispatch();

  const removeFromCategory = () => {
    dispatch(removeWidgetFromCategory({ widgetId: widget.id, categoryId }));
  };

  const deleteGlobally = () => {
    if (window.confirm('Delete this widget completely from all categories?')) {
      dispatch(deleteWidget({ widgetId: widget.id }));
    }
  };

  return (
    <div className="group relative w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 min-h-[200px] sm:min-h-[250px]">
  {/* Header - stacks on mobile, row on sm+ */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4 gap-3">
    <h3 className="w-full sm:w-auto text-base sm:text-lg font-bold text-gray-800 tracking-tight pr-2 truncate">
      {widget.title}
    </h3>

    {/* Action buttons - always visible on mobile, hover-only on desktop */}
    <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
      <button
        aria-label="Remove from this category"
        title="Remove from this category"
        onClick={removeFromCategory}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        aria-label="Delete widget"
        title="Delete widget"
        onClick={deleteGlobally}
        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 active:bg-red-100 text-red-500 hover:text-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>

  {/* Body */}
  <div className="px-4 sm:px-6 pb-6 sm:pb-6">
    <p className="text-gray-600 leading-relaxed text-sm sm:text-sm overflow-hidden line-clamp-4 sm:line-clamp-6">
      {widget.text}
    </p>
  </div>

  {/* subtle footer line */}
  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
</div>

  );
}