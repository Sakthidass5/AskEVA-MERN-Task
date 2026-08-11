import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Bar } from "react-chartjs-2";

export default function Analytics() {
  const data = {
    labels: ["HR", "IT", "Sales"],
    datasets: [{ label: "Employees", data: [5, 10, 7], backgroundColor: "blue" }]
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Employees</Typography>
            <Typography variant="h4">22</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </Grid>
    </Grid>
  );
}
