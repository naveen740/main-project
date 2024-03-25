import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import "./css/Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle login errors

  const handleLogin = async (e) => {
    e.preventDefault();
    // Perform validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      // Send login data to backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", // Replace with your backend URL
        {
          email,
          password,
        }
      );

      // Handle successful login
      console.log("Login successful:", response.data);
      alert("Login successful!");
      // Redirect to login page
      window.location.href = "/dashboard";
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);
      setError("Invalid email or password."); // Set error message
    }
  };

  const handleLogout = () => {
    // Perform logout actions
    // For example, clear user session or token
    // Optionally, you can also send a request to the server to invalidate the session/token

    // Modify browser history stack to prevent navigating back to authenticated pages
    window.history.replaceState(null, "", "/login");
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-heading">Login</h2>
        {error && <p className="login-error">{error}</p>}{" "}
        {/* Display error message if there's an error */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="register-link">
          Not registered?{" "}
          <Link to="/register" className="register-link-text">
            Register here
          </Link>
        </p>
      </div>
      {/* Add logout button */}
    </div>
  );
};

export default Login;
