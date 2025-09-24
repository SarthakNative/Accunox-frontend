import { useDispatch } from 'react-redux';
import { removeWidgetFromCategory, deleteWidget } from '../slices/dashboardSlice';

export default function WidgetCard({ widget, categoryId }) {
  const dispatch = useDispatch();

  const removeFromCategory = () => {
    dispatch(removeWidgetFromCategory({ widgetId: widget.id, categoryId }));
  };

  const deleteGlobally = () => {
    // confirm before deleting globally
    if (window.confirm('Delete this widget completely from all categories?')) {
      dispatch(deleteWidget({ widgetId: widget.id }));
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="widget-top">
        <strong>{widget.title}</strong>
        <div className="widget-actions">
          <button title="Remove from this category" onClick={removeFromCategory} className="x-btn">✕</button>
          <button title="Delete widget" onClick={deleteGlobally} className="trash-btn">🗑</button>
        </div>
      </div>
      <div className="widget-body">{widget.text}</div>
    </div>
  );
}
