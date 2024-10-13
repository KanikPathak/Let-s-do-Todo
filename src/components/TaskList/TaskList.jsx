import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

export default function TaskList({ filteredTasks, toggleTaskStatus, editTask, deleteTask, addSubtask, toggleSubtask }) {
  return (
    <div className="task-list">
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          toggleTaskStatus={toggleTaskStatus}
          editTask={editTask}
          deleteTask={deleteTask}
          addSubtask={addSubtask}
          toggleSubtask={toggleSubtask}
        />
      ))}
    </div>
  );
}