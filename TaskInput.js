// src/TaskInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const TaskInput = () => {
 const [task, setTask] = useState('');
 const dispatch = useDispatch();

 const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch({ type: 'ADD_TASK', payload: { id: Date.now(), text: task } });
      setTask('');
    }
 };

 return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
 );
};

export default TaskInput;
