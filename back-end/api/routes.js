import express from "express";
import userRouter from "./user/user.router.js";
import projectRouter from "./project/project.router.js";
import projectUserRouter from "./projectUser/projectUser.router.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/projectUser", projectUserRouter);

export default router;
