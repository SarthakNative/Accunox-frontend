import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWidgetCategory, addCategory } from '../slices/dashboardSlice';

export default function CategoryManager({ isOpen, onClose }) {
  const categories = useSelector(s => s.dashboard.categories);
  const widgets = useSelector(s => s.dashboard.widgets);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(categories[0]?.id || '');

  const onToggle = (widgetId, categoryId, checked) => {
    dispatch(toggleWidgetCategory({ widgetId, categoryId, checked }));
  };

  const handleConfirm = () => {
    // Add your confirm logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Side Popup */}
    <div className="fixed top-0 right-0 h-screen w-full max-w-[480px] bg-white shadow-xl z-50 flex flex-col animate-slide-in">
        
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-5 flex justify-between items-center">
          <h2 className="text-lg font-medium">Add Widget</h2>
          <button 
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
            onClick={onClose}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <p className="text-slate-500 text-sm mb-6">
            Personalise your dashboard by adding the following widget
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-slate-200">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`
                  px-4 py-3 text-sm transition-colors relative
                  ${activeTab === cat.id 
                    ? 'text-blue-900 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-900' 
                    : 'text-slate-500 hover:text-slate-700'
                  }
                `}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Widget List */}
          <div className="space-y-4">
            {widgets.length === 0 && (
              <div className="text-center text-slate-400 py-10 text-sm">
                No widgets available
              </div>
            )}
            {widgets.map(widget => {
              const isChecked = widget.categoryIds.includes(activeTab);
              return (
                <label 
                  key={widget.id} 
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onToggle(widget.id, activeTab, e.target.checked)}
                    className="w-5 h-5 text-blue-900 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{widget.title}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-200 flex justify-end gap-3">
          <button 
            className="px-6 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-900 border border-blue-900 rounded-md hover:bg-blue-800 hover:border-blue-800 transition-colors"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}