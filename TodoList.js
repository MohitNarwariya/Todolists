import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle ,InputAdornment} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

// Actions
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK = 'EDIT_TASK';

// Action Creators
const addTask = task => ({ type: ADD_TASK, task });
const deleteTask = id => ({ type: DELETE_TASK, id });
const editTask = (id, newTask) => ({ type: EDIT_TASK, id, newTask });

// Reducer
const initialState = { tasks: [] };
const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, { id: Date.now(), text: action.task }] };
    case DELETE_TASK:
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.id) };
    case EDIT_TASK:
      return { ...state, tasks: state.tasks.map(task => task.id === action.id ? { ...task, text: action.newTask } : task) };
    default:
      return state;
  }
};

// Store
const store = createStore(tasksReducer);

// Components
const TaskInput = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
    <TextField
      variant="outlined"
      label="New Task"
      value={task}
      onChange={e => setTask(e.target.value)}
      style={{ marginRight: '10px', flex: 1 }}
      InputLabelProps={{
        style: { display: 'flex', alignItems: 'center' }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <span></span>
          </InputAdornment>
        ),
      }}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddTask}
      startIcon={<AddIcon />}
    >
      Add
    </Button>
  </div>
  );
};

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');

  const handleDeleteTask = id => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = task => {
    setCurrentTask(task);
    setNewTaskText(task.text);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    dispatch(editTask(currentTask.id, newTaskText));
    setEditDialogOpen(false);
  };

  return (
    <List>
      {tasks.map(task => (
        <ListItem key={task.id}>
          <ListItemText primary={task.text} />
          <IconButton edge="end" onClick={() => handleEditTask(task)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => handleDeleteTask(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            value={newTaskText}
            onChange={e => setNewTaskText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

const TodoList = () => {
  return (
    <Provider store={store}>
      <Container maxWidth="sm">
        <h1>To-Do List</h1>
        <TaskInput />
        <TaskList />
      </Container>
    </Provider>
  );
};

export default TodoList;
