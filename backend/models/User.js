// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },          // User full name
  email: { type: String, required: true, unique: true }, // Login email
  password: { type: String, required: true },      // Hashed password
  role: { type: String, enum: ["admin", "employee"], default: "employee" }, // Role based access
}, { timestamps: true });

export default mongoose.model("User", userSchema);
