import express from "express";
import * as TaskController from "./task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/:projectId", TaskController.createTask);
taskRouter.patch("/:taskId", TaskController.updateTaskStatus);
taskRouter.put("/:projectId/:taskId", TaskController.updateTask);
taskRouter.get("/:projectId", TaskController.getProjectTasks);

export default taskRouter;
