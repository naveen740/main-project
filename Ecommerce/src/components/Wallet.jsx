import React, { useState, useEffect } from "react";
import axios from "axios";
import CardForm from "./CardForm";

import { Link } from "react-router-dom";
import "./css/Wallet.css"; // Import CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [showCardForm, setShowCardForm] = useState(false);
  const [fadeIn, setFadeIn] = useState(false); // State for fade-in animation

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/wallet/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
        setLoading(false);
        setFadeIn(true); // Trigger fade-in animation after loading
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  const handleAddFunds = async () => {
    if (parseInt(amountToAdd) > 0) {
      setShowCardForm(true);
    }
  };

  const handlePayNow = async (cardDetails) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/wallet/process-payment",
        {
          amount: amountToAdd,
          cardDetails: cardDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBalance(response.data.balance);
      alert("Added Fund successfully");
      // Add fade-out animation before reloading
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.reload();
      }, 100); // Adjust the time to match the animation duration
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={`wallet-container ${fadeIn ? "fade-in" : ""}`}>
      <Link to="/home">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <h1>My Wallet</h1>
      <p className="balance">Balance: Rs {balance}</p>
      <div className="add-funds-form">
        <input
          type="text"
          placeholder="Amount to Add"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
        />
        <button className="add-funds-button" onClick={handleAddFunds}>
          Add Funds
        </button>
      </div>
      {showCardForm && (
        <CardForm
          amountToAdd={parseInt(amountToAdd)}
          handlePayNow={handlePayNow}
        />
      )}
    </div>
  );
};

export default Wallet;
