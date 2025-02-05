import { createSlice } from "@reduxjs/toolkit";


const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const initialState = {
  todos: loadTodos(),
};


const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        title: action.payload.title,
        priority: action.payload.priority,
        completed: false,
      });
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Save to localStorage
    },
    
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Save to localStorage
    },

    editTodos: (state, action) => {
      const { id, title, priority } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.priority = priority;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Update localStorage
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, editTodos, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
