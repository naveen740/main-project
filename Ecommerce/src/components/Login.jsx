import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css"; // Import your CSS file for styling

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingProfileStatus, setCheckingProfileStatus] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log(data.token);
        onLogin();
        setCheckingProfileStatus(true);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkProfileStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Token not found, user is not logged in
          return navigate("/login");
        }

        const response = await fetch(
          "http://localhost:5000/api/profile-form/profile-status",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok && data.profileFilled) {
          // If profile form is filled, redirect to the home page
          navigate("/home");
        } else {
          // If profile form is not filled, redirect to the profile page
          navigate("/profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (checkingProfileStatus) {
      // Call the function to check profile status after login
      checkProfileStatus();
    }
  }, [navigate, checkingProfileStatus]);

  return (
    <div className="login-container">
      {" "}
      {/* Added a class for styling */}
      <h2 className="login-title">Login</h2> {/* Added class for title */}
      <form onSubmit={handleSubmit} className="login-form">
        {" "}
        {/* Added class for form */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>{" "}
        {/* Added class for button */}
      </form>
    </div>
  );
};

export default Login;
