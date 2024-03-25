import React, { useState } from "react";
import "./css/slider.css";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faPrint,
  faBoxOpen,
  faFolder,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function Slider() {
  const handleLogout = () => {
    // Redirect the user to the login page
    window.location.href = "/login";
  };
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };
  return (
    <div className="slide">
      <header className="logo  poppins-bold">
        <span className="brand">
          <FontAwesomeIcon icon={faPrint} />
        </span>
        <span style={{ color: "white" }}>Printify</span>
      </header>
      <div className="main">
        <ul>
          <li
            className={`item ${
              selectedItem === "Dashboard" ? "selected" : ""
            } open-sans`}
          >
            <Link
              to="/dashboard"
              className="custom-link"
              onClick={() => handleItemClick("Dashboard")}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="item-icon" />
              Dashboard
            </Link>
          </li>
          <li className="item open-sans">
            <Link
              to="/product"
              className="custom-link"
              onClick={() => handleItemClick("Product")}
            >
              <FontAwesomeIcon icon={faBoxOpen} className="item-icon" />
              Product
            </Link>
          </li>
          <li className="item open-sans">
            <Link
              to="/category"
              className="custom-link"
              onClick={() => handleItemClick("Category")}
            >
              <FontAwesomeIcon icon={faFolder} className="item-icon" />
              Category
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="slide-log">
          <FontAwesomeIcon icon={faSignOutAlt} className="item-icon" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Slider;
