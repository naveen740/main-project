import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/Success.css";

const Success = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/check-payment/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Failed to fetch order details. Please try again.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!orderDetails) {
    return <div className="no-details">No order details found.</div>;
  }

  return (
    <div className="success-container">
      <div className="header">
        <h1>Order Success!</h1>
        <p>Your order has been successfully placed.</p>
      </div>
      <div className="order-details">
        <h2>Order Details</h2>
        <div className="order-info">
          <p className="label">Invoice:</p>
          <p className="value">{orderDetails.invoice}</p>
        </div>
        <div className="order-info">
          <p className="label">Order Placed Date:</p>
          <p className="value">
            {new Date(orderDetails.orderPlacedDate).toLocaleString()}
          </p>
        </div>
        <div className="order-info">
          <p className="label">Customer Name:</p>
          <p className="value">
            {orderDetails.firstName} {orderDetails.lastName}
          </p>
        </div>
        <div className="order-info">
          <p className="label">Email:</p>
          <p className="value">{orderDetails.email}</p>
        </div>
        <div className="order-info">
          <p className="label">Phone Number:</p>
          <p className="value">{orderDetails.phoneNumber}</p>
        </div>
        <div className="order-info">
          <p className="label">Shipping Address:</p>
          <p className="value">
            {orderDetails.streetAddress}, {orderDetails.city},{" "}
            {orderDetails.country}, {orderDetails.zipCode}
          </p>
        </div>
        <div className="order-info">
          <p className="label">Payment Method:</p>
          <p className="value">{orderDetails.paymentMethod}</p>
        </div>
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul className="summary-list">
          {orderDetails.orderSummary.map((item, index) => (
            <li key={index} className="summary-item">
              <p>{item.productName}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
        <p className="total-price">
          Total Price: <span>${orderDetails.totalPrice}</span>
        </p>
      </div>
    </div>
  );
};

export default Success;
