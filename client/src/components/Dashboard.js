import { Grid, Button } from "@mui/material";
import EmployeeTable from "./EmployeeTable";
import Analytics from "./Analytics";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
      </Grid>
      <Grid item xs={12} md={8}>
        <EmployeeTable />
      </Grid>
      <Grid item xs={12} md={4}>
        <Analytics />
      </Grid>
    </Grid>
  );
}
