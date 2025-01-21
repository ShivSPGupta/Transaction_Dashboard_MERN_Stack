import React, { useState } from "react";
import TransactionStatistics from "./TransactionStatistics";
import TransactionBarChart from "./TransactionBarChart";
import TransactionTable from "./TransactionTable";
import "./MainDashboard.css";
import TransactionPieChart from "./TransactionPieChart";

const MainDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("March"); // Default month

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Transaction Dashboard
      </h2>

      <TransactionTable
        selectedMonth={selectedMonth}
        handleMonthChange={handleMonthChange}
      />
      <span>&nbsp;</span>
      <TransactionStatistics selectedMonth={selectedMonth} />
      <div style={{display:"flex",justifyContent:"space-between",gap:6, margin:"20px"}}>
      <TransactionBarChart selectedMonth={selectedMonth} />
      <TransactionPieChart selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default MainDashboard;
