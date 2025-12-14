import React from 'react';

const Filters = ({
  filterPriority, setFilterPriority,
  filterDueDate, setFilterDueDate,
  filterStatus, setFilterStatus,
  sortBy, setSortBy
}) => {
  return (
    <div className="filters">
      <h3>Filters & Sorting</h3>
      <label className="filter-label">
        Priority:
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <label className="filter-label">
        Due Date (by):
        <input
          type="date"
          value={filterDueDate}
          onChange={e => setFilterDueDate(e.target.value)}
        />
      </label>
      <label className="filter-label">
        Status:
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="To-Do">To-Do</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label className="filter-label">
        Sort By:
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="due">Closest Due Date</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;