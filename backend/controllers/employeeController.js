const Employee = require("../models/Employee");

// Get employees with search, filter, pagination
exports.getEmployees = async (req, res) => {
  const { search, department, status, page = 1, limit = 5 } = req.query;
  let query = {};
  if (search) query.$or = [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }];
  if (department) query.department = department;
  if (status) query.status = status;

  const employees = await Employee.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  const total = await Employee.countDocuments(query);

  res.json({ employees, total });
};

// Create employee
exports.createEmployee = async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};
