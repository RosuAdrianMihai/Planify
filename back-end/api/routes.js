import express from "express";
import userRouter from "./user/user.router.js";
import projectRouter from "./project/project.router.js";
import projectUserRouter from "./projectUser/projectUser.router.js";
import taskRouter from "./task/task.router.js";
import taskUserRouter from "./taskUser/taskUser.router.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/projectUser", projectUserRouter);
router.use("/task", taskRouter);
router.use("/taskUser", taskUserRouter);

export default router;
