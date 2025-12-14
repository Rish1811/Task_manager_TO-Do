import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import dayjs from 'dayjs';
import TaskModal from './components/TaskModal';
import Filters from './components/Filters';
import initialTasks from './tasks.json';
import './App.css';

const getDroppableId = (board) => board.toLowerCase().replace(/[\s-]/g, '');

const getStatusFromId = (id) => {
  const boards = ['To-Do', 'In-Progress', 'Completed'];
  return boards.find(board => getDroppableId(board) === id) || 'To-Do';
};

// Main app component for the task manager
function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState('');
  const [filterDueDate, setFilterDueDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const boards = ['To-Do', 'In-Progress', 'Completed'];

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || !draggableId) return;

    const taskId = parseInt(draggableId);
    const newStatus = getStatusFromId(destination.droppableId);
    const sourceStatus = getStatusFromId(result.source.droppableId);

    if (newStatus && newStatus !== sourceStatus) {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    }
  };

  const handleSaveTask = (taskData) => {
    let newTasks = [...tasks];
    if (selectedTask) {
      newTasks = newTasks.map(t => t.id === taskData.id ? taskData : t);
    } else {
      const newTask = { ...taskData, id: Date.now(), createdAt: dayjs().toISOString() };

      const baseTitle = newTask.title.replace(/\s*\(\d+\)$/, '');
      const sameBoardBaseTitles = newTasks.filter(t => 
        t.status === newTask.status && 
        t.title.replace(/\s*\(\d+\)$/, '') === baseTitle
      );
      if (sameBoardBaseTitles.length > 0) {
        const numbers = sameBoardBaseTitles.map(t => {
          const match = t.title.match(/\s*\((\d+)\)$/);
          return match ? parseInt(match[1]) : 0;
        });
        const maxNum = Math.max(...numbers, 0);
        newTask.title = `${baseTitle} (${maxNum + 1})`;
      }

      newTasks.push(newTask);
    }
    setTasks(newTasks);
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const openNewTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const getFilteredAndSortedTasks = () => {
    let filtered = tasks.filter(task => {
      if (filterPriority && task.priority !== filterPriority) return false;
      if (filterStatus && task.status !== filterStatus) return false;
      if (filterDueDate && dayjs(task.dueDate).isAfter(dayjs(filterDueDate))) return false; // Keeps due on/before date
      return true;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'oldest') return dayjs(a.createdAt).diff(dayjs(b.createdAt));
      if (sortBy === 'newest') return dayjs(b.createdAt).diff(dayjs(a.createdAt));
      if (sortBy === 'due') return dayjs(a.dueDate).diff(dayjs(b.dueDate));
      return 0;
    });

    return filtered;
  };

  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <div className="app">
      <div className="sidebar">
        <Filters
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterDueDate={filterDueDate}
          setFilterDueDate={setFilterDueDate}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <div className="main-content">
        <nav className="nav">
          <h1>Task Manager</h1>
          <button onClick={openNewTaskModal} className="add-btn">Add Task</button>
        </nav>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="boards">
            {boards.map(board => {
              const boardTasks = filteredTasks.filter(task => task.status === board);
              const boardClass = board.toLowerCase().replace(/\s/g, '-');
              return (
                <Droppable droppableId={getDroppableId(board)} key={board}>
                  {(provided) => (
                    <div className={`board ${boardClass}`} {...provided.droppableProps} ref={provided.innerRef}>
                      <h2>{board}</h2>
                      {boardTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => openEditTaskModal(task)}
                            >
                              <div className="task-header">
                                <h3>{task.title}</h3>
                                <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                                  {task.priority}
                                </span>
                              </div>
                              <p className="description">{task.description}</p>
                              <p className="due">Due: {dayjs(task.dueDate).format('MMM DD, YYYY')}</p>
                              <p className="created">Created: {dayjs(task.createdAt).format('MMM DD, YYYY')}</p>
                              <button 
                                className="delete-btn"
                                onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <TaskModal
            task={selectedTask}
            onSave={handleSaveTask}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;