import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardForm from "./CardForm";
import "./css/CheckoutPage.css";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    country: "",
    zipCode: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);
  const [showCardForm, setShowCardForm] = useState(false);
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
        setLoading(false);
      }
    };

    fetchOrderProducts();
  }, []);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/order/total-price",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error("Error fetching total price:", error);
      }
    };

    fetchTotalPrice();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "paymentMethod" && value === "Credit Card") {
      setShowCardForm(true);
    } else {
      setShowCardForm(false);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let response;

      if (formData.paymentMethod === "Cash On Delivery") {
        response = await axios.post(
          "http://localhost:5000/api/check-payment",
          {
            ...formData,
            totalPrice,
            orderSummary: orderProducts.map((orderProduct) => ({
              productName: orderProduct.product.productName,
              quantity: orderProduct.quantity,
              price: orderProduct.product.price,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (formData.paymentMethod === "Credit Card") {
        const cardDetails = {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
        };
        response = await handleCreditCardPayment(cardDetails);
      } else if (formData.paymentMethod === "Wallet") {
        const walletBalanceResponse = await axios.get(
          "http://localhost:5000/api/wallet/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const walletBalance = walletBalanceResponse.data.balance;
        if (walletBalance >= totalPrice) {
          const updateWalletResponse = await axios.post(
            "http://localhost:5000/api/wallet/update-balance",
            {
              amount: totalPrice,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          response = await axios.post(
            "http://localhost:5000/api/check-payment",
            {
              ...formData,
              totalPrice,
              orderSummary: orderProducts.map((orderProduct) => ({
                productName: orderProduct.product.productName,
                quantity: orderProduct.quantity,
                price: orderProduct.product.price,
              })),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          alert("Insufficient balance in your wallet.");
          return;
        }
      } else {
        alert("Selected payment method is not supported yet!");
        return;
      }

      const orderId = response.data.orderId;
      alert("Order placed successfully!");
      navigate(`/success/${orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleCreditCardPayment = async (cardDetails) => {
    try {
      // Implement logic to validate card details and process payment
      // Example:
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/wallet/process-payment",
        {
          amount: totalPrice,
          cardDetails: cardDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error processing credit card payment:", error);
      throw new Error("Failed to process credit card payment.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.post(
  //       "http://localhost:5000/api/check-payment",
  //       {
  //         ...formData,
  //         totalPrice,
  //         orderSummary: orderProducts.map((orderProduct) => ({
  //           productName: orderProduct.product.productName,
  //           quantity: orderProduct.quantity,
  //           price: orderProduct.product.price,
  //         })),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const orderId = response.data.orderId;
  //     alert("Order placed successfully!");
  //     navigate(`/success/${orderId}`);
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     alert("Failed to place order. Please try again.");
  //   }
  // };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="personal-details">
          <h3>Personal Details</h3>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="shipping-details">
          {/* Shipping detail fields go here... */}
          <h3>Shipping Details</h3>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="shipping-cost">
          {/* Shipping cost options go here... */}
        </div>

        <div className="payment-method">
          <h3>Payment Method</h3>
          <input
            type="radio"
            name="paymentMethod"
            value="Cash On Delivery"
            onChange={handleChange}
            required
          />
          <label htmlFor="cashOnDelivery">Cash On Delivery</label>
          <br />
          <input
            type="radio"
            name="paymentMethod"
            value="Credit Card"
            onChange={handleChange}
            required
          />
          <label htmlFor="creditCard">Credit Card</label>
          <br />
          <input
            type="radio"
            name="paymentMethod"
            value="Wallet"
            onChange={handleChange}
            required
          />
          <label htmlFor="wallet">Wallet</label>
          <br />
          {showCardForm && <CardForm handleChange={handleChange} />}
        </div>

        <div className="checkout-buttons-container">
          <button type="button" className="continue-shopping">
            Continue Shopping
          </button>
          <button type="submit" className="confirm-order">
            Confirm Order
          </button>
        </div>
      </form>

      <div className="order-summary-container">
        <h3 className="order-summary-title">Order Summary</h3>
        <ul className="order-summary-list">
          {orderProducts.map((orderProduct) => (
            <li
              key={orderProduct._id}
              className="order-summary-item animate__animated animate__fadeInUp"
            >
              <span>{orderProduct.product.productName}</span>
              <span>Quantity: {orderProduct.quantity}</span>
              <span>Price: ${orderProduct.product.price}</span>
            </li>
          ))}
        </ul>
        <p className="total-amount">Total Amount: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default CheckoutPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./css/CheckoutPage.css"; // Import custom CSS file

// function CheckoutPage() {
//   const [orderProducts, setOrderProducts] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrderProducts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           "http://localhost:5000/api/order/mycart",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setOrderProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching order products:", error);
//         setError("Error fetching order products. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchOrderProducts();
//   }, []);

//   useEffect(() => {
//     const fetchTotalPrice = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           "http://localhost:5000/api/order/total-price",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setTotalPrice(response.data.totalPrice);
//       } catch (error) {
//         console.error("Error fetching total price:", error);
//         // Handle error accordingly
//       }
//     };

//     fetchTotalPrice();
//   }, []);

//   const handleProceedToPayment = () => {
//     navigate(`/payment/${totalPrice}`);
//   };

//   const handleCancel = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   return (
//     <div className="checkout-container">
//       <h2 className="checkout-title">Checkout</h2>
//       <div className="order-summary-container">
//         <h3 className="order-summary-title">Order Summary</h3>
//         <ul className="order-summary-list">
//           {orderProducts.map((orderProduct) => (
//             <li
//               key={orderProduct._id}
//               className="order-summary-item animate__animated animate__fadeInUp"
//             >
//               <span>{orderProduct.product.productName}</span>
//               <span>Quantity: {orderProduct.quantity}</span>
//               <span>Price: ${orderProduct.product.price}</span>
//             </li>
//           ))}
//         </ul>
//         <div className="total-amount">Total Amount: ${totalPrice}</div>
//         <div className="checkout-buttons-container">
//           <button
//             className="checkout-button animate__animated animate__pulse"
//             onClick={handleProceedToPayment}
//           >
//             Proceed to Payment
//           </button>
//           <button
//             className="checkout-button animate__animated animate__pulse"
//             onClick={handleCancel}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CheckoutPage;
