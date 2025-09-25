import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../slices/dashboardSlice';

export default function AddWidgetModal({ categoryId, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a widget name');
      return;
    }
    dispatch(addWidget({ title: title.trim(), text: text.trim() || 'Sample widget text', categoryId }));
    onClose();
  };

  return (
    <div className="bg-[#f5f7fb] text-gray-900 antialiased">
      <div
        className="fixed inset-0 bg-black/35 flex items-center justify-center z-[60]"
        onClick={onClose}
      >
        <div
          className="w-[420px] max-w-[92%] bg-white p-[18px] rounded-lg shadow-[0_8px_30px_rgba(20,20,40,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold mb-2">Add Widget</h3>

          <form onSubmit={onSubmit} className="space-y-2.5">
            <label className="block">
              <div className="text-sm mb-1.5">Widget Title</div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-md border border-[#ddd] focus:outline-none focus:border-[#2b6ef6]"
              />
            </label>

            <label className="block">
              <div className="text-sm mb-1.5">Widget Text (optional)</div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 rounded-md border border-[#ddd] min-h-[84px] focus:outline-none focus:border-[#2b6ef6]"
              />
            </label>

            <div className="flex gap-2 justify-end mt-2">
              <button 
                type="submit" 
                className="bg-[#2b6ef6] text-white px-3 py-2 rounded-md cursor-pointer hover:bg-[#2360e5]"
              >
                Add
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#eee] text-gray-900 px-3 py-2 rounded-md cursor-pointer hover:bg-[#ddd]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}