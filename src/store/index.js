import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer, // Register the todoSlice reducer
  },
});

export default store;
