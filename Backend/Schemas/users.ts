import mongoose, { Schema } from "mongoose";
import { NewUser } from "../types";

const userSchema: Schema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  name: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  admin: { type: Boolean, required: true },
});

export default mongoose.model<NewUser>("user", userSchema);
