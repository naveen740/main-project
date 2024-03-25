import React from "react";
import { Link, useNavigate } from "react-router-dom"; // import Link component
import "./css/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/myorder");
  };
  const handlewalletclick = () => {
    navigate("/wallet");
  };
  return (
    <div className="home-container">
      <div className="home-top">
        {/* Link to AddOrderPage component */}
        <Link to="/add-order" className="btn btn-one">
          Add Order
        </Link>
        <button className="btn btn-two" onClick={handlewalletclick}>
          My Wallet
        </button>
        <button className="btn btn-three" onClick={handleClick}>
          My Order
        </button>
        <button className="btn btn-four">Gallery</button>
      </div>
    </div>
  );
}

export default Home;
