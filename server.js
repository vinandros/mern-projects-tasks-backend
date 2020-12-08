import express from "express";
import dotenv from "dotenv";

dotenv.config();

// creating server
const app = express();

//main page
// app.get("/", (req, res) => {
//   res.send("hi World!");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
