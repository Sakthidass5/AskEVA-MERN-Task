import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Analytics({ reload }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees/analytics")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [reload]); 
  if (!data) return <p>Loading analytics...</p>;

  const deptData = {
    labels: data.deptCounts.map(d => d._id),
    datasets: [{
      label: "Employees per Department",
      data: data.deptCounts.map(d => d.count),
      backgroundColor: "rgba(75,192,192,0.6)"
    }]
  };

  const monthlyData = {
    labels: data.monthlyJoined.map(m => `Month ${m._id}`),
    datasets: [{
      label: "Monthly Joined Employees",
      data: data.monthlyJoined.map(m => m.count),
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54,162,235,0.4)"
    }]
  };

  const statusData = {
    labels: data.statusCounts.map(s => s._id),
    datasets: [{
      label: "Status Distribution",
      data: data.statusCounts.map(s => s.count),
      backgroundColor: ["#36A2EB", "#FF6384"]
    }]
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3>Total Employees: {data.totalEmployees}</h3>
        <h4>Active Employees: {data.activeEmployees}</h4>
      </div>

      <div style={{ height: "250px" }}>
        <Bar data={deptData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <div style={{ height: "250px" }}>
        <Line data={monthlyData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <div style={{ height: "250px" }}>
        <Pie data={statusData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
