import express from "express";
import {
  getUsers,
  signin,
  signup,
  updateUser,
} from "../controller/user.controller.js";
import { authmiddleware } from "../middleware/index.js";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({
    msg: "Hello",
    status: "success",
  });
});

/**
 * signup
 * first we check all the input is valid
 * then we check if user already exists
 * after that we will create a new user
 */
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.put("/update", authmiddleware, updateUser);
userRouter.get("/bulk", authmiddleware, getUsers);
