import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Task", taskSchema);