import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import "./css/register.css"; // Import CSS file

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to handle registration errors

  const handleRegister = async (e) => {
    e.preventDefault();
    // Perform validation
    if (!name || !email || !password || password !== confirmPassword) {
      setError("Please fill out all fields and ensure passwords match.");
      return;
    }

    try {
      // Send registration data to backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // Handle successful registration
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      // Handle registration errors
      console.error("Registration error:", error);
      setError(error.response.data.message); // Set error message received from the backend
    }
  };

  return (
    <div className="reg-cont">
      <div className="reg-form">
        <h2 className="reg-heading">Registration</h2>
        {error && <p className="reg-error">{error}</p>}{" "}
        {/* Display error message if there's an error */}
        <form onSubmit={handleRegister}>
          <div className="reg-form-group">
            <label className="reg-label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="reg-input"
            />
          </div>
          <div className="reg-form-group">
            <label className="reg-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="reg-input"
            />
          </div>
          <div className="reg-form-group">
            <label className="reg-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="reg-input"
            />
          </div>
          <div className="reg-form-group">
            <label className="reg-label">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="reg-input"
            />
          </div>
          <button type="submit" className="reg-btn">
            Register
          </button>
        </form>
        <p className="reg-login-link">
          Already registered?{" "}
          <Link to="/login" className="reg-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
