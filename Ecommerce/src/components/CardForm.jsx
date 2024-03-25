import React, { useState } from "react";
import "./css/CardForm.css";

const CardForm = ({ amountToAdd, handlePayNow }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (input) => {
    // Remove any non-digit characters from the input
    let formattedInput = input.replace(/\D/g, "");

    // Insert a space after every 4 characters
    formattedInput = formattedInput.replace(/(.{4})/g, "$1 ");

    // Trim any trailing spaces
    formattedInput = formattedInput.trim();

    return formattedInput;
  };

  const formatExpiryDate = (input) => {
    // Remove any non-digit characters from the input
    let formattedInput = input.replace(/\D/g, "");

    // Insert a slash after the first two characters
    if (formattedInput.length > 2) {
      formattedInput =
        formattedInput.slice(0, 2) + "/" + formattedInput.slice(2);
    }

    return formattedInput;
  };

  const handleCardNumberChange = (e) => {
    const input = e.target.value;

    // Format the card number and update state
    setCardNumber(formatCardNumber(input));
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value;

    // Format the expiry date and update state
    setExpiryDate(formatExpiryDate(input));
  };

  const handlePayNowClick = () => {
    // Validate card details here if needed

    // Pass card details to parent component for payment processing
    handlePayNow({ cardNumber, expiryDate, cvv });
  };

  return (
    <div className="card-form">
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={handleCardNumberChange}
      />
      <input
        type="text"
        placeholder="Expiry Date (MM/YYYY)"
        value={expiryDate}
        onChange={handleExpiryDateChange}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      {amountToAdd > 0 && (
        <button onClick={handlePayNowClick}>Pay Now - Rs {amountToAdd}</button>
      )}
    </div>
  );
};

export default CardForm;
