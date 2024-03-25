import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleRegister = () => {
    setIsLogin(true);
  };

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {isLogin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Register onRegister={handleRegister} />
      )}
      <button onClick={toggleForm}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
};

export default AuthPage;
