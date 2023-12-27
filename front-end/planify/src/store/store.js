import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import projectReducer from "./projectSlice.js";
import taskReducer from "./taskSlice.js";

export const store = configureStore({
  reducer: {
    users: userReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
});
