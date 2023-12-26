import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects(state, action) {
      const projects = action.payload;

      for (const project of projects) {
        state.projects.push(project);
      }
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    clearProjects(state) {
      state.projects = [];
    },
  },
});

export const { setProjects, addProject, clearProjects } = projectSlice.actions;

export default projectSlice.reducer;
