import React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHome, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faUserCircle } from "@fortawesome/free-regular-svg-icons";

const BottomNav = () => (
  <div className="bottomnav-wrapper">
    <div id="each-bottom-nav-link">
      <Link to="/groups">
        <div className="bottom-icon">
          <FontAwesomeIcon icon={faUserFriends} />
        </div>
        Groups
      </Link>
    </div>

    <div id="each-bottom-nav-link">
      <Link to="/tasks">
        <div className="bottom-icon">
          <FontAwesomeIcon icon={faCheck} />
        </div>
        Tasks
      </Link>
    </div>

    <div id="each-bottom-nav-link">
      <Link to="/home">
        <div className="bottom-icon">
          <FontAwesomeIcon icon={faHome} />
        </div>
        Home
      </Link>
    </div>

    <div id="each-bottom-nav-link">
      <Link to="/calendar">
        <div className="bottom-icon">
          <FontAwesomeIcon icon={faCalendar} />
        </div>
        Calendar
      </Link>
    </div>

    <div id="each-bottom-nav-link">
      <Link to="/account">
        <div className="bottom-icon">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        Account
      </Link>
    </div>
  </div>
);

export default BottomNav;
