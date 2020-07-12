import express, { Application } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors = require("cors");
import path from "path";
dotenv.config();

const app: Application = express();

const PORT: string | number = process.env.PORT || 5000;

const URI = process.env.MONGODB_URI;

const connection: mongoose.Connection = mongoose.connection;

app.use(express.json());
app.use(cors());

mongoose.connect(URI || "mongodb://localhost/api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, "../Client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/build", "index.html"));
});

connection.once("open", () => {
  console.log("MongoDB connection has been established successfully");
});

//routes
const users: NodeRequire = require("./Routes/users"); // sign-up/login
app.use("/users", users);

const tasks: NodeRequire = require("./Routes/tasks"); // tasks handling
app.use("/tasks", tasks);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
