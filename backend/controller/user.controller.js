import { User } from "../schema/UserSchema.js";
import { signUpSchema } from "../zodSchemas/userSchema.js";
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
