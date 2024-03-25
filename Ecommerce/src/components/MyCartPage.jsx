import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/MyCartPage.css"; // Import CSS file for styling

function MyCartPage() {
  const [orderProducts, setOrderProducts] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0); // State for total number of orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/order/mycart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order products:", error);
        setError("Error fetching order products. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrderProducts();
  }, []);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/order/total-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalOrders(response.data.totalOrders);
      } catch (error) {
        console.error("Error fetching total orders:", error);
        // Handle error accordingly
      }
    };

    fetchTotalOrders();
  }, []);

  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate("/checkout");
    // Implement the checkout functionality
  };

  const handleEdit = (productId) => {
    // Implement the edit functionality for the specified product
  };

  const handleDelete = (productId) => {
    // Implement the delete functionality for the specified product
  };

  const handleBack = () => {
    navigate("/add-order"); // Navigate back to the previous page
  };

  return (
    <div className="my-cart-container">
      <div className="cart-topright">
        <h2 className="page-title">My Cart ({totalOrders})</h2>
        <p onClick={handleBack}>+</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orderProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="product-list">
          {orderProducts.map((orderProduct) => {
            const totalArea =
              orderProduct.width * orderProduct.height * orderProduct.quantity;
            const totalPrice = totalArea * orderProduct.product.price;
            return (
              <div key={orderProduct._id} className="product-card">
                <h3 className="product-name">
                  {orderProduct.product.productName}
                </h3>
                <p className="product-details">
                  <p>
                    Width <span>&#215;</span> height: {orderProduct.width}{" "}
                    <span>&#215;</span> {orderProduct.height} Sq.Ft.
                  </p>
                  <p>Quantity: {orderProduct.quantity}</p>
                </p>
                <p className="total-area">Total Sq.Ft: {totalArea} Sq.Ft.</p>
                <p className="total-price">Total Price: ${totalPrice}</p>
                <div className="actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(orderProduct.product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(orderProduct.product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default MyCartPage;
