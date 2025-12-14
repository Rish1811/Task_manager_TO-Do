import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const TaskModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [status, setStatus] = useState('To-Do');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(dayjs(task.dueDate).format('YYYY-MM-DD'));
      setStatus(task.status);
    } else {
     
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate(dayjs().format('YYYY-MM-DD'));
      setStatus('To-Do');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: task ? task.id : null,
      title,
      description,
      priority,
      dueDate: dayjs(dueDate).toISOString(),
      status,
      createdAt: task ? task.createdAt : null,
    });
  };

  return (
    <div className="modal">
      <h2 style={{ marginTop: 0, color: '#333' }}>{task ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Priority:
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        </label>
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>To-Do</option>
            <option>In-Progress</option>
            <option>Completed</option>
          </select>
        </label>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Save Task</button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;