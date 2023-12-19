import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProjects(state, action) {
      return action.payload;
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
  },
});

export const { getProjects, addProject } = projectSlice.actions;

export default projectSlice.reducer;
