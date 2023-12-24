import express from "express";
import * as UserController from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/", UserController.createUser);
userRouter.post("/signIn", UserController.signInUser);
userRouter.get("/", UserController.getUsers);

export default userRouter;
