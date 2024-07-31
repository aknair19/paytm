import express from "express";

import { signin, signup } from "../controller/user.controller.js";

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
