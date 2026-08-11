import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  // Load employees
useEffect(() => {
  axios.get("http://localhost:5000/api/employees")
    .then(res => setEmployees(res.data.employees)); // controller returns { employees }
}, []);

const handleDelete = (id) => {
  if (window.confirm("Delete employee?")) {
    axios.delete(`http://localhost:5000/api/employees/${id}`).then(() => {
      setEmployees(employees.filter(emp => emp._id !== id));
    });
  }
};


  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "joiningDate", headerName: "Joining Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <Button onClick={() => { setEditData(params.row); setOpenForm(true); }}>Edit</Button>
          <Button color="error" onClick={() => handleDelete(params.row._id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <>
      <Button variant="contained" onClick={() => setOpenForm(true)}>Add Employee</Button>
      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row._id}   // important for MongoDB
        pageSize={5}
        autoHeight
      />
      <EmployeeForm open={openForm} onClose={() => setOpenForm(false)} editData={editData} />
    </>
  );
}
