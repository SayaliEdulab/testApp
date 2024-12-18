import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(), // Unique ID based on timestamp
        text: action.payload,
        completed: false,
      };
      state.unshift(newTodo); // Add new TODO at the top
    },
  },
});

export const {addTodo} = todoSlice.actions;
export default todoSlice.reducer;
