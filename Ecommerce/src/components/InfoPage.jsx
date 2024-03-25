import React from "react";
import "./css/InfoPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faInbox,
  faCircleInfo,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function InfoPage() {
  return (
    <div className="info-container">
      <div className="info-btn">
        <button className="pgbtn">
          <Link to="/edit-profile">
            <div className="info-icon">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="info-iconstyle button1"
              />
              Profile
            </div>
          </Link>
        </button>
        <button className="pgbtn">
          <div className="info-icon">
            <FontAwesomeIcon
              icon={faInbox}
              className="info-iconstyle button2"
            />
            Inbox
          </div>
        </button>
        <button className="pgbtn">
          <div className="info-icon">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="info-iconstyle button3"
            />
            About
          </div>
        </button>
        <button className="pgbtn">
          <div className="info-icon">
            <FontAwesomeIcon
              icon={faShareFromSquare}
              className="info-iconstyle button4"
            />
            Share
          </div>
        </button>
      </div>
    </div>
  );
}

export default InfoPage;
