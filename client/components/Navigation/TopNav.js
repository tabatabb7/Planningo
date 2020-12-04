import React from "react";
import { Link } from "react-router-dom";
import "./topnav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHome, faBars,
  faBell,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faUserCircle } from "@fortawesome/free-regular-svg-icons";


const TopNav =({toggleSideNav}) => {
  return (
    <div className="topnav-wrapper">
      <div id="left-nav-links">
        <div id="each-top-nav-link-open" onClick={toggleSideNav}>
          <div className="top-nav-icon-bar">
            <FontAwesomeIcon icon={faBars} />
        </div>
        </div>
        <div id="each-top-nav-link">
          <Link to="/home">
            <div className="top-nav-icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
          </Link>
        </div>
        <div id="each-top-nav-link">
          <Link to="/tasks">
            <div className="top-nav-icon">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </Link>
        </div>
      </div>

      <div id="right-nav-links">
      <div id="each-top-nav-link">
          <Link to="/calendar">
            <div className="top-nav-icon">
              <FontAwesomeIcon icon={faCalendar} />
            </div>
          </Link>
        </div>

        <div id="each-top-nav-link">
          <Link to="/account">
            <div className="top-nav-icon">
              <FontAwesomeIcon icon={faCog} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default TopNav;
