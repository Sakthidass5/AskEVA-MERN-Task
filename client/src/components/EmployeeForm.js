import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useEffect } from "react";

export default function EmployeeForm({ open, onClose, editData, onSaved }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: {} });

  useEffect(() => {
    if (open) {
      if (editData) {
        reset(editData);   // Edit mode
      } else {
        reset({ name: "", email: "", department: "", designation: "", status: "", joiningDate: "" });
      }
    }
  }, [open, editData, reset]);

  const handleClose = () => {
    reset({ name: "", email: "", department: "", designation: "", status: "", joiningDate: "" });
    onClose();
  };

  const onSubmit = async (data) => {
    const today = new Date().toISOString().split("T")[0];
    if (data.joiningDate > today) {
      alert("Joining date cannot be in the future");
      return;
    }

    try {
      if (editData) {
        await axios.put(`http://localhost:5000/api/employees/${editData._id}`, data);
      } else {
        await axios.post("http://localhost:5000/api/employees", data);
      }
      if (onSaved) onSaved(); 
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
      <DialogTitle>
        {editData ? "Edit Employee" : "Add Employee"}
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Name" fullWidth margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name} helperText={errors.name?.message} />

          <TextField label="Email" fullWidth margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
            })}
            error={!!errors.email} helperText={errors.email?.message} />

          <TextField label="Department" fullWidth margin="normal"
            {...register("department", { required: "Department is required" })}
            error={!!errors.department} helperText={errors.department?.message} />

          <TextField label="Designation" fullWidth margin="normal"
            {...register("designation", { required: "Designation is required" })}
            error={!!errors.designation} helperText={errors.designation?.message} />

          <TextField label="Status" fullWidth margin="normal"
            {...register("status", { required: "Status is required" })}
            error={!!errors.status} helperText={errors.status?.message} />

          <TextField label="Joining Date" type="date" fullWidth margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register("joiningDate", { required: "Joining date is required" })}
            error={!!errors.joiningDate} helperText={errors.joiningDate?.message} />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {editData ? "Update" : "Add"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
