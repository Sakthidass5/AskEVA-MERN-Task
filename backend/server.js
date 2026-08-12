const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Atlas DB connected"))
  .catch(err => console.error(err));

app.use("/api", authRoutes);
app.use("/api/employees", employeeRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on ${process.env.PORT || 5000}`);
});
