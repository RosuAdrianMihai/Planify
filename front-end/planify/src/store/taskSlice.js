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
    updateTask: (state, action) => {
      const updatedTask = action.payload;

      state.tasks = state.tasks.map((task) => {
        if (task.id != updatedTask.id) {
          return task;
        }

        return updatedTask;
      });
    },
    clearTasks: (state, action) => {
      state.tasks = [];
    },
  },
});

export const { setTasks, addTask, updateTask, clearTasks } = taskSlice.actions;

export default taskSlice.reducer;
