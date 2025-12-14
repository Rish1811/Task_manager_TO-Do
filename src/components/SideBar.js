import React from 'react';

const Sidebar = ({
  filterPriority, setFilterPriority,
  filterDueDate, setFilterDueDate,
  filterStatus, setFilterStatus,
  sortBy, setSortBy
}) => {
  return (
    <div className="sidebar-content">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Priority</label>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Due Date (By)</label>
        <input
          type="date"
          value={filterDueDate}
          onChange={e => setFilterDueDate(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Status</label>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All</option>
          <option value="To-Do">To-Do</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <h3>Sort By</h3>
      <div className="filter-group">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="due">Closest Due Date</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;