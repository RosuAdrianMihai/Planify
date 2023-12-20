import express from "express";
import * as ProjectUserController from "./projectUser.controller.js";

const projectUserRouter = express.Router();

projectUserRouter.post("/:projectId", ProjectUserController.addProjectMember);
projectUserRouter.post("/", ProjectUserController.getProjectsMember);

export default projectUserRouter;
