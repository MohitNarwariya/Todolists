// src/TaskList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TaskList = () => {
 const tasks = useSelector(state => state.tasks);
 const dispatch = useDispatch();

 const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
 };

 return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.text}
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
 );
};

export default TaskList;
