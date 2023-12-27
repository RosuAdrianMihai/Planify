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
  },
});

export const { setTasks } = taskSlice.actions;

export default taskSlice.reducer;
