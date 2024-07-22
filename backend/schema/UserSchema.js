const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

export const User = mongoose.model("User", userSchema);
