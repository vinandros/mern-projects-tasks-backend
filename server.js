import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import users from "./routes/users.js";
import auth from "./routes/auth.js";

dotenv.config({ path: "variables.env" });

// creating server
const app = express();

// connectDB
connectDB();

// enable express.json
app.use(express.json({ extended: true }));

// routes
app.use("/api/users", users);
app.use("/api/auth", auth);

// main page
app.get("/", (req, res) => {
  res.send("API project handler app.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
