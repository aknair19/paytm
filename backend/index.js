import mongoose from "mongoose";
import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
import { rootRouter } from "./routes/index.js";
//we are using cors because frontend and backend are at different ports
app.use(cors());
//since we have to make post requests we need to add middleware to convert json to object
app.use(express.json());
app.use("/api/v1", rootRouter);
app.get("/", (req, res) => {
  res.json({
    msg: "Hello",
    status: "success",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listening to Port", process.env.PORT);
});

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Bind connection to open event (to get notification of connection success)
db.once("open", function () {
  console.log("Connected to MongoDB");
});
