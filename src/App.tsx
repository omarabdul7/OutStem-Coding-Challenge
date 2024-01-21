import React, { useState } from "react";
import "./App.css";
import ReviewPieChart from "./components/ReviewPieChart";
import OrderBarChart from "./components/OrderBarChart";
import TotalRevenue from "./components/TotalRevenue";
import MonthlyRevenueChart from "./components/MonthlyRevenueChart";

function App() {
  const [startDate, setStartDate] = useState<string>("2023-01-01");
  const [endDate, setEndDate] = useState<string>("2023-12-31");

  return (
    <div className="App">
      <header className="App-header">
        <h1>A Slice of Pi - Dashboard</h1>

        <div className="date-input-container">
          <label>
            Start Date:
            <input
              type="date"
              className="date-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              className="date-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>

        <div className="dashboard-container">
            <div className="section-container">
              <h2>Review Analysis</h2>
              <div className="review-pie-chart">
                <ReviewPieChart startDate={startDate} endDate={endDate} />
              </div>
          </div>

            <div className="section-container">
              <h2>Orders per Store</h2>
              <div className="order-bar-chart">
                <OrderBarChart startDate={startDate} endDate={endDate} />
              </div>
          </div>

          <div className="total-revenue ">
            <div className="section-container">
              <h2>Total Revenue in 2023</h2>
              <TotalRevenue />
            </div>
          </div>

          <div className="monthy-revenue">
            <div className="section-container">
              <h2>Monthly Revenue in 2023</h2>
              <MonthlyRevenueChart startDate={startDate} endDate={endDate} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
