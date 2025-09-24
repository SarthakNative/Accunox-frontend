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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add Widget</h3>
        <form onSubmit={onSubmit} className="modal-form">
          <label>
            Widget Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Widget Text (optional)
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </label>
          <div className="modal-actions">
            <button type="submit" className="btn">Add</button>
            <button type="button" className="btn alt" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
