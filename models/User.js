import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  signupDate: {
    type: Date,
    default: Date.now(),
  },
});

export default model("User", UserSchema);
