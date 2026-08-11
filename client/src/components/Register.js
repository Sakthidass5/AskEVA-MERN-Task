import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/register", data);
      alert("Registration successful!");
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Validation */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Email Validation */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password Validation */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
                message: "Must include uppercase, lowercase, number, and special character"
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
