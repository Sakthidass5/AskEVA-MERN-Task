import Employee from "../models/Employee.js";

export const getEmployees = async (req, res) => {
  try {
    const { search, department, status, page = 1, limit = 5 } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") }
      ];
    }

    if (department) {
      query.department = new RegExp(`^${department}$`, "i"); 
    }

    if (status) {
      query.status = new RegExp(`^${status}$`, "i"); 
    }

    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Employee.countDocuments(query);

    res.json({ employees, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};


export const createEmployee = async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
};

export const updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
};

export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted successfully" });
};

export const getAnalytics = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: "active" }); 
    const deptCounts = await Employee.aggregate([{ $group: { _id: "$department", count: { $sum: 1 } } }]);
    const monthlyJoined = await Employee.aggregate([{ $group: { _id: { $month: "$joiningDate" }, count: { $sum: 1 } } }]);
    const statusCounts = await Employee.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);

    res.json({ totalEmployees, activeEmployees, deptCounts, monthlyJoined, statusCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
