// MyOrders.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/MyOrders.css"; // Import CSS file for styling
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/checkout/myorder",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Apply loading class
  }

  return (
    <div className="my-orders-container">
      <div className="myorder-top">
        <Link to="/home">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1 className="page-title">My Orders</h1>
      </div>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h3>Invoice Number: {order.invoice}</h3>
          <p>
            Order Placed Date:{" "}
            {new Date(order.orderPlacedDate).toLocaleDateString("en-US")}
          </p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Total Price: ${order.totalPrice}</p>
          <div className="order-action">
            <Link to={`/success/${order._id}`} className="view-details-link">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
