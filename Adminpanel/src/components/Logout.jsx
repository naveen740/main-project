import React from "react";

const Logout = () => {
  const handleLogout = () => {
    // Redirect the user to the login page
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
