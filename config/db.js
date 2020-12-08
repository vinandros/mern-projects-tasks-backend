import mongoose from "mongoose";
import dotenv from "dotenv";

//load env variables
dotenv.config({ path: "variables.env" });

// connectDB
const connectDB = async () => {
  try {
    //connection
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    //state
    const db = mongoose.connection;
    db.on("error", (console) => {
      console.error.bind(console, "connection error:");
      process.exit(1);
    });
    db.once("open", function () {
      console.log("DB Connected");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
