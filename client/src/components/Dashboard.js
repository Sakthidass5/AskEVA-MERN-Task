import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import Analytics from "./Analytics";
import { Button } from "@mui/material";

export default function Dashboard() {
  const [reloadAnalytics, setReloadAnalytics] = useState(false);

  const handleDataChanged = () => {
    setReloadAnalytics(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";  
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2>Employee Management Dashboard</h2>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <EmployeeTable onDataChanged={handleDataChanged} />
        <Analytics reload={reloadAnalytics} />
      </div>
    </div>
  );
}
