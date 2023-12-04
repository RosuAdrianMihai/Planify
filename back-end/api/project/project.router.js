import express from "express";
import * as ProjectController from "./project.controller.js";

const projectRouter = express.Router();

projectRouter.post("/", ProjectController.createProject);
projectRouter.get("/", ProjectController.getProjects);

export default projectRouter;
