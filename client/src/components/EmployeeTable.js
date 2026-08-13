
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeTable({ onDataChanged }) {
  const [employees, setEmployees] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadEmployees = () => {
    axios.get("http://localhost:5000/api/employees", {
      params: { search, department, status, page, limit: 5 }
    }).then(res => {
      setEmployees(res.data.employees);
      setTotal(res.data.total);
    }).catch(err => console.error(err));
  };

  useEffect(() => { loadEmployees(); }, [search, department, status, page]);

  const handleDelete = (id) => {
    if (window.confirm("Delete employee?")) {
      axios.delete(`http://localhost:5000/api/employees/${id}`).then(() => {
        loadEmployees();
        onDataChanged(); 
      }).catch(err => console.error(err));
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
      <div style={{ marginBottom: 16 }}>
        <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} />
        <Select value={department} onChange={e => setDepartment(e.target.value)} displayEmpty style={{ marginLeft: 8 }}>
          <MenuItem value="">All Departments</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </Select>
        <Select value={status} onChange={e => setStatus(e.target.value)} displayEmpty style={{ marginLeft: 8 }}>
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="notworking">Not Working</MenuItem>
        </Select>
        <Button variant="contained" style={{ marginLeft: 8 }} onClick={() => { setEditData(null); setOpenForm(true); }}>
          Add Employee
        </Button>
      </div>

      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        autoHeight
        pagination
        rowCount={total}
        page={page - 1}
        onPageChange={(newPage) => setPage(newPage + 1)}
        paginationMode="server"
      />

      <EmployeeForm
        open={openForm}
        onClose={() => { setOpenForm(false); setEditData(null); }}
        editData={editData}
        onSaved={() => { loadEmployees(); onDataChanged(); }} 
      />
    </>
  );
}
