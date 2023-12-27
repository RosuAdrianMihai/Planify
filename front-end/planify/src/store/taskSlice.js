import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      const tasks = action.payload;

      for (const task of tasks) {
        state.tasks.push(task);
      }
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    clearTasks: (state, action) => {
      state.tasks = [];
    },
  },
});

export const { setTasks, addTask, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;
