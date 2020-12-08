import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../store";
import { Link } from "react-router-dom";
import "./sidenav.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import {
faCalendar
} from '@fortawesome/free-regular-svg-icons';
import "./sidenav.css";


const SideNav = ({ handleClick, user }) => (
  <div className="side-nav-wrapper">

<div id="userprof">
    <img src={user.avatarUrl} id="usericon"></img>
      {user.firstName} {user.lastName}
    <div id="homebutton-wrap">
      <Link to="/home">
        <button id="homebutton">Home</button>
      </Link>
    </div>
    </div>

<div id="link-acc-wrap">
    <div id="nav-links">
      <div id="each-nav-link">
      <Link to="/groups">
      <div className="icon">
      <FontAwesomeIcon icon={faUserFriends} />
       </div>Groups</Link>
       </div>

       <div id="each-nav-link">
      <Link to="/calendar">
      <div className="icon">
      <FontAwesomeIcon icon={faCalendar} />
       </div>Calendar</Link>
       </div>

       <div id="each-nav-link">
      <Link to="/tasks">
      <div className="icon">
      <FontAwesomeIcon icon={faCheck} />
       </div>Tasks</Link>
       </div>

    </div>

    <div id="nav-account-links">
      <Link to="/account">My account</Link>
      <a href="#" onClick={handleClick}>
        Sign out
      </a>
    </div>
    </div>
  </div>
);

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(SideNav);

SideNav.propTypes = {
  user: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};
