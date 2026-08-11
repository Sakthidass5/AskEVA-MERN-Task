// controllers/employeeController.js
import Employee from "../models/Employee.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Get employees (with search/filter/pagination)
export const getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", department, status } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") }
      ];
    }
    if (department) query.department = department;
    if (status) query.status = status;

    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Employee.countDocuments(query);

    res.json({ employees, total });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// Create employee
export const createEmployee = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    let hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const employee = new Employee({ ...rest, password: hashedPassword });
    await employee.save();
    res.status(201).json({ employee });
  } catch (err) {
    res.status(400).json({ error: "Failed to create employee" });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ employee });
  } catch (err) {
    res.status(400).json({ error: "Failed to update employee" });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete employee" });
  }
};
