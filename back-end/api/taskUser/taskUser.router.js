import express from "express";
import * as TaskUserController from "./taskUser.controller.js";

const taskUserRouter = express.Router();

taskUserRouter.post("/:taskId", TaskUserController.requestTask);
taskUserRouter.put("/:taskId/:userId", TaskUserController.assignTask);
taskUserRouter.get("/:userId", TaskUserController.getUserTasks);
taskUserRouter.get("/:taskId", TaskUserController.getTaskApplicants);
taskUserRouter.delete(
  "/:taskId/:userId",
  TaskUserController.retreatTaskRequest
);

export default taskUserRouter;
