import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

export default model("Task", TaskSchema);
