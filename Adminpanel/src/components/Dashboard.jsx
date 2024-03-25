import React from "react";
import ReactDOM from "react-dom/client"; // Import your CSS file
import "./css/dashboard.css";
import ContactPage from "./ContactPage";

function Dashboard() {
  return (
    <div
      className="dashboard"
      style={{ backgroundColor: "rgb(17, 24, 39)", color: "white" }}
    >
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat stat1">
          <h3>Total Orders</h3>
          <p>100</p>
        </div>
        <div className="stat stat2">
          <h3>Total Orders</h3>
          <p>100</p>
        </div>
        <div className="stat stat3">
          <h3>Total Orders</h3>
          <p>100</p>
        </div>
        <div className="stat stat4">
          <h3>Total Revenue</h3>
          <p>$10,000</p>
        </div>
        <div className="stat stat5">
          <h3>Active Users</h3>
          <p>500</p>
        </div>
      </div>
      <ContactPage />
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <ul>
          <li>#12345 - Product Name - $100</li>
          <li>#12346 - Product Name - $200</li>
          <li>#12347 - Product Name - $150</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
