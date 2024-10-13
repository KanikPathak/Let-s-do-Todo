import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header/Header';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: '',
    status: 'pending'
  });
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('dueDate');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTask = () => {
    if (newTask.title.trim() !== '') {
      setTasks([...tasks, { ...newTask, id: uuidv4(), subtasks: [] }]);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'medium', category: '', status: 'pending' });
      setShowAddTask(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task);
    setNewTask(task);
    setShowAddTask(true);
  };

  const updateTask = () => {
    setTasks(tasks.map(task => task.id === editingTask.id ? newTask : task));
    setEditingTask(null);
    setNewTask({ title: '', description: '', dueDate: '', priority: 'medium', category: '', status: 'pending' });
    setShowAddTask(false);
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
    ));
  };

  const addSubtask = (taskId, subtask) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, subtasks: [...task.subtasks, { id: uuidv4(), title: subtask, completed: false }] } : task
    ));
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, subtasks: task.subtasks.map(subtask => 
        subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
      ) } : task
    ));
  };

  const filteredTasks = tasks
    .filter(task => filter === 'all' || task.status === filter)
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sort === 'priority') return ['low', 'medium', 'high'].indexOf(b.priority) - ['low', 'medium', 'high'].indexOf(a.priority);
      return 0;
    });

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewTask({ ...newTask, title: transcript });
      };
      recognition.start();
    } else {
      alert('Voice input is not supported in your browser.');
    }
  };

  return (
    <motion.div 
      className={`app ${darkMode ? 'dark' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="app-container">
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          showAddTask={showAddTask} 
          setShowAddTask={setShowAddTask} 
        />

        <AnimatePresence>
          {showAddTask && (
            <TaskForm 
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
              editingTask={editingTask}
              updateTask={updateTask}
              handleVoiceInput={handleVoiceInput}
            />
          )}
        </AnimatePresence>

        <motion.div 
          className="filters"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input 
            type="text" 
            placeholder="Search tasks" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select 
            onChange={(e) => setSort(e.target.value)}
            className="sort-select"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </motion.div>

        <TaskList 
          filteredTasks={filteredTasks}
          toggleTaskStatus={toggleTaskStatus}
          editTask={editTask}
          deleteTask={deleteTask}
          addSubtask={addSubtask}
          toggleSubtask={toggleSubtask}
        />

        <PomodoroTimer 
          pomodoroTime={pomodoroTime}
          isPomodoroActive={isPomodoroActive}
          setIsPomodoroActive={setIsPomodoroActive}
          setPomodoroTime={setPomodoroTime}
        />
      </div>
    </motion.div>
  );
}