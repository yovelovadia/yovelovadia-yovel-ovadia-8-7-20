import mongoose, { Schema } from "mongoose";
import { Task } from "../types";

const taskSchema: Schema = new Schema({
  taskName: { type: String, default: " ", required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export default mongoose.model<Task>("task", taskSchema);
