import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", data);
      console.log(res,'res')
      localStorage.setItem("token", res?.data?.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
                message: "Password must include uppercase, lowercase, number, and special character"
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
