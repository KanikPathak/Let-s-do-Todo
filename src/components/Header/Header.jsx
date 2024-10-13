import React from 'react';
import { FaMoon, FaSun, FaPlus } from 'react-icons/fa';
import './Header.css';

export default function Header({ darkMode, setDarkMode, showAddTask, setShowAddTask }) {
  return (
    <header className="header">
      <h1 className="title">Let's do Todo</h1>
      <div className="header-buttons">
        <button 
          onClick={() => setShowAddTask(!showAddTask)}
          className="add-task-button"
        >
          <FaPlus /> {showAddTask ? 'Close' : 'Add Task'}
        </button>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle-button"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}