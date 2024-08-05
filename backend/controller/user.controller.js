import { User } from "../schema/UserSchema.js";
import {
  signinSchema,
  signUpSchema,
  updateSchema,
} from "../zodSchemas/userSchema.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  const { username, firstName, lastName, password } = req.body;
  console.log(req.body);
  const { success } = signUpSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      success: success,
      message: " all required fields are missing",
    });
  }
  const existingUser = await User.findOne({
    username: username,
  });

  if (existingUser) {
    return res
      .json({
        message: "Email already taken",
      })
      .status(411);
  }

  const user = await User.create({
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  const userId = user._id;
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return res
    .json({
      message: "User created successfully",
      token: token,
    })
    .status(200);
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      success: success,
      message: "missing required fields",
    });
  }

  const user = await User.findOne({
    username: username,
    password: password,
  });

  if (!user) {
    return res.status(411).json({
      success: false,
      message: "something went wrong, please check your credentials",
    });
  }

  const userId = user._id;
  if (user) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    return res
      .json({
        success: true,
        token: token,
      })
      .status(200);
  }

  return res.json({ message: "Something went wrong" }).status(411);
};

export const updateUser = async (req, res) => {
  try {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
      return res
        .json({
          message: "Error while updating information",
        })
        .status(403);
    }

    await User.updateOne({ _id: req.userId }, req.body);
    return res.status(200).json({
      message: "Details has been updated",
    });
  } catch (error) {
    console.log(error);
  }
};
