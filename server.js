import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
//router
import users from "./routes/users.js";
import auth from "./routes/auth.js";
import projects from "./routes/projects.js";
import tasks from "./routes/tasks.js";

dotenv.config({ path: "variables.env" });

// creating server
const app = express();

// connectDB
connectDB();

//enable cors
app.use(cors());

// enable express.json
app.use(express.json({ extended: true }));

// routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/projects", projects);
app.use("/api/tasks", tasks);

// main page
app.get("/", (req, res) => {
  res.send("API project handler app.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
