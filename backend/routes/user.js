import express from "express";
import { signUpSchema } from "../zodSchamas/userSchema";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({
    msg: "Hello",
    status: "success",
  });
});

//signup and signin router
userRouter.post("/signup", (req, res) => {
  //   const { username, firstName, lastName, password } = req.body;

  const { success } = signUpSchema.safeParse(req.body);
});
