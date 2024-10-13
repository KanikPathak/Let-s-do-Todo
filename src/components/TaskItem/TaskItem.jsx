import React from 'react';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './TaskItem.css';

const PRIORITY_COLORS = {
  low: 'task-priority-low',
  medium: 'task-priority-medium',
  high: 'task-priority-high'
};

export default function TaskItem({ task, toggleTaskStatus, editTask, deleteTask, addSubtask, toggleSubtask }) {
  return (
    <motion.div 
      className={`task-item ${task.status === 'completed' ? 'task-completed' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-meta">
        <span className="task-due-date">Due: {task.dueDate}</span>
        <span className={`task-priority ${PRIORITY_COLORS[task.priority]}`}>
          Priority: {task.priority}
        </span>
        {task.category && (
          <span className="task-category">
            Category: {task.category}
          </span>
        )}
      </div>
      <div className="task-subtasks">
        <h4>Subtasks:</h4>
        {task.subtasks.map(subtask => (
          <div key={subtask.id} className="subtask">
            <input 
              type="checkbox" 
              checked={subtask.completed} 
              onChange={() => toggleSubtask(task.id, subtask.id)} 
            />
            <span className={subtask.completed ? 'completed' : ''}>{subtask.title}</span>
          </div>
        ))}
        <input 
          type="text" 
          placeholder="Add subtask" 
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addSubtask(task.id, e.target.value);
              e.target.value = '';
            }
          }}
          className="add-subtask-input"
        />
      </div>
      <div className="task-actions">
        <motion.button 
          onClick={() => toggleTaskStatus(task.id)} 
          className="task-action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {task.status === 'completed' ? <FaTimes /> : <FaCheck />}
        </motion.button>
        <motion.button 
          onClick={() => editTask(task)} 
          className="task-action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaEdit />
        </motion.button>
        <motion.button 
          onClick={() => deleteTask(task.id)} 
          className="task-action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTrash />
        </motion.button>
      </div>
    </motion.div>
  );
}