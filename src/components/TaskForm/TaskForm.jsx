import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './TaskForm.css';

export default function TaskForm({ newTask, setNewTask, addTask, editingTask, updateTask, handleVoiceInput }) {
  return (
    <motion.div 
      className="task-form"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <input 
        type="text" 
        placeholder="Task title" 
        value={newTask.title} 
        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
        className="task-input"
      />
      <textarea 
        placeholder="Description" 
        value={newTask.description} 
        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
        className="task-textarea"
      />
      <div className="task-form-row">
        <div className="task-form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input 
            id="dueDate"
            type="date" 
            value={newTask.dueDate} 
            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            className="task-input"
          />
        </div>
        <div className="task-form-group">
          <label htmlFor="priority">Priority</label>
          <select 
            id="priority"
            value={newTask.priority} 
            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            className="task-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <input 
        type="text" 
        placeholder="Category" 
        value={newTask.category} 
        onChange={(e) => setNewTask({...newTask, category: e.target.value})}
        className="task-input"
      />
      <div className="task-form-buttons">

        
        <motion.button 
          onClick={editingTask ? updateTask : addTask}
          className="submit-task-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </motion.button>
      </div>
    </motion.div>
  );
}