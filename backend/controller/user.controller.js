import { User } from "../schema/UserSchema.js";
import { signinSchema, signUpSchema } from "../zodSchemas/userSchema.js";
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

  console.log("done1");
  const { success } = signinSchema.safeParse(req.body);
  console.log("done2");

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
  console.log("done3");

  if (!user) {
    return res.status(411).json({
      success: false,
      message: "something went wring, please check your credentials",
    });
  }
  console.log("done4");

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
