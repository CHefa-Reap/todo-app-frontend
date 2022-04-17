import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const resp = await fetch("http://localhost:5000/api/v1/todos");
  if (resp) {
    const todos = await resp.json();

    return { todos };
  }
});

export const addTodos = createAsyncThunk("todos/addTodos", async (payload) => {
  const resp = await fetch("http://localhost:5000/api/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todoName: payload.todoName,
      endDate: payload.endDate,
    }),
  });

  if (resp.ok) {
    const todo = await resp.json();
    return { todo };
  }
});

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload) => {
    const resp = await fetch(
      `http://localhost:5000/api/v1/todos/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: payload.completed }),
      }
    );

    if (resp.ok) {
      const todo = await resp.json();
      return { todo };
    }
  }
);

export const deleteTodos = createAsyncThunk(
  "todos/deleteTods",
  async (payload) => {
    const resp = await fetch(
      `http://localhost:5000/api/v1/todos/${payload.id}`,
      {
        method: "DELETE",
      }
    );

    if (resp) {
      return { id: payload.id };
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: action.payload._id,
        todoName: action.payload.todoName,
        endDate: action.payload.endDate,
        completed: false,
      };
      state.push(todo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodos.fulfilled]: (state, action) => {
      return action.payload.todos.data;
    },
    [addTodos.fulfilled]: (state, action) => {
      state.push(action.payload.todo.data);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
