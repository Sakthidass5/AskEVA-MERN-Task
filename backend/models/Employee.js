import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  department: { type: String },
  designation: { type: String },
  status: { type: String, enum: ["active", "notworking"], default: "active" },
  joiningDate: { type: Date }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
