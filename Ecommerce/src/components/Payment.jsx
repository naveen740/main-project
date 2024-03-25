// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSpring, animated } from "react-spring";
// import "./css/Payment.css"; // Import custom CSS file for styling

// function Payment() {
//   const { totalPrice } = useParams();
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Animation for form fields
//   const fieldAnimation = useSpring({
//     from: { opacity: 0, transform: "translateY(20px)" },
//     to: { opacity: 1, transform: "translateY(0)" },
//     config: { tension: 300, friction: 10 },
//   });

//   // Animation for button
//   const buttonAnimation = useSpring({
//     from: { opacity: 0, transform: "scale(0.8)" },
//     to: { opacity: 1, transform: "scale(1)" },
//     config: { tension: 300, friction: 10 },
//   });

//   // Animation for error message
//   const errorAnimation = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: 1 },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:5000/api/payment/process",
//         { cardDetails, totalPrice },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.status === 200) {
//         // Payment successful, navigate to success page
//         navigate("/success");
//       } else {
//         setError("Payment failed. Please try again.");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       setError("Payment failed. Please try again.");
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="payment-container">
//       <h2 className="payment-title">Enter Card Details</h2>
//       <p className="total-price">Total Price: ${totalPrice}</p>
//       <animated.form
//         onSubmit={handleSubmit}
//         className="payment-form"
//         style={fieldAnimation}
//       >
//         <label htmlFor="cardNumber" className="payment-label">
//           Card Number:
//         </label>
//         <input
//           type="text"
//           id="cardNumber"
//           name="cardNumber"
//           value={cardDetails.cardNumber}
//           onChange={handleChange}
//           className="payment-input"
//           placeholder="1234 5678 9012 3456"
//           required
//         />

//         <label htmlFor="expiryDate" className="payment-label">
//           Expiry Date:
//         </label>
//         <input
//           type="text"
//           id="expiryDate"
//           name="expiryDate"
//           value={cardDetails.expiryDate}
//           onChange={handleChange}
//           className="payment-input"
//           placeholder="MM/YY"
//           required
//         />

//         <label htmlFor="cvv" className="payment-label">
//           CVV:
//         </label>
//         <input
//           type="text"
//           id="cvv"
//           name="cvv"
//           value={cardDetails.cvv}
//           onChange={handleChange}
//           className="payment-input"
//           placeholder="123"
//           required
//         />

//         <animated.button
//           type="submit"
//           className="payment-button"
//           disabled={loading}
//           style={buttonAnimation}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </animated.button>
//         {error && (
//           <animated.p className="payment-error" style={errorAnimation}>
//             {error}
//           </animated.p>
//         )}
//       </animated.form>
//     </div>
//   );
// }

// export default Payment;

// // import React, { useState } from "react";
// // import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";

// // function Payment() {
// //   const { totalPrice } = useParams();
// //   const [paymentLoading, setPaymentLoading] = useState(false);
// //   const [customerName, setCustomerName] = useState("");
// //   const [customerAddress, setCustomerAddress] = useState("");
// //   const stripe = useStripe();
// //   const elements = useElements();

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     setPaymentLoading(true);
// //     if (!stripe || !elements) return;

// //     try {
// //       const token = localStorage.getItem("token");

// //       const response = await axios.post(
// //         "http://localhost:5000/api/payment/create-payment-intent",
// //         {
// //           amount: totalPrice,
// //           customer_name: customerName, // Include customer name
// //           customer_address: customerAddress, // Include customer address
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const { clientSecret } = response.data;
// //       const result = await stripe.confirmCardPayment(clientSecret, {
// //         payment_method: {
// //           card: elements.getElement(CardElement),
// //         },
// //       });

// //       if (result.error) {
// //         console.error(result.error.message);
// //       } else if (result.paymentIntent.status === "succeeded") {
// //         console.log("Payment succeeded");
// //         // Handle successful payment (e.g., redirect to confirmation page)
// //       }
// //     } catch (error) {
// //       console.error(error);
// //     }

// //     setPaymentLoading(false);
// //   };

// //   return (
// //     <div className="payment-container">
// //       <h2 className="payment-title">Payment</h2>
// //       <form className="payment-form" onSubmit={handleSubmit}>
// //         <div className="input-group">
// //           <label htmlFor="card-element">Card Information</label>
// //           <CardElement
// //             id="card-element"
// //             options={{
// //               style: {
// //                 base: {
// //                   fontSize: "16px",
// //                   color: "#32325d",
// //                   ":placeholder": {
// //                     color: "#aab7c4",
// //                   },
// //                 },
// //                 invalid: {
// //                   color: "#fa755a",
// //                 },
// //               },
// //             }}
// //           />
// //         </div>
// //         <div className="input-group">
// //           <label htmlFor="customer-name">
// //             Customer Name (Required for Exports):
// //           </label>
// //           <input
// //             type="text"
// //             id="customer-name"
// //             value={customerName}
// //             onChange={(e) => setCustomerName(e.target.value)}
// //             placeholder="Enter customer name"
// //             required
// //           />
// //         </div>
// //         <div className="input-group">
// //           <label htmlFor="customer-address">
// //             Customer Address (Required for Exports):
// //           </label>
// //           <input
// //             type="text"
// //             id="customer-address"
// //             value={customerAddress}
// //             onChange={(e) => setCustomerName(e.target.value)} // Typo corrected: setCustomerAddress
// //             placeholder="Enter customer address"
// //             required
// //           />
// //         </div>
// //         <button
// //           className="payment-button"
// //           type="submit"
// //           disabled={!stripe || !elements || paymentLoading}
// //         >
// //           {paymentLoading ? "Processing..." : "Pay Now"}
// //         </button>
// //         <div className="total-amount">Total Amount: ${totalPrice}</div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Payment;
