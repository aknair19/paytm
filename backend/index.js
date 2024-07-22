const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.get("/", (req, res) => {
  res.json({
    msg: "Hello",
    status: "success",
  });
});

app.listen(8080, () => {
  console.log("Listening to Port 8080");
});

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Bind connection to open event (to get notification of connection success)
db.once("open", function () {
  console.log("Connected to MongoDB");
});
