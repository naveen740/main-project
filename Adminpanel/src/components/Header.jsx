import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMoon,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./css/header.css";

function Header({ toggleSlideVisibility }) {
  return (
    <div className="head">
      <div className="head1">
        <div
          className="left-icons"
          style={{ color: "rgb(16, 185, 129)" }}
          onClick={toggleSlideVisibility}
        >
          {/* <FontAwesomeIcon icon={faSlidersH} className='icon' /> */}
          <FontAwesomeIcon icon={faBars} className="icon" />
        </div>
        <div className="right-icons">
          <FontAwesomeIcon icon={faMoon} className="icon" />
          <FontAwesomeIcon icon={faSun} className="icon" />
          <FontAwesomeIcon icon={faUser} className="icon" />
        </div>
      </div>
    </div>
  );
}

export default Header;
