import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {logout} from '../../store';
import { Link } from "react-router-dom";
import "./SideNav.css";

const SideNav = ({ handleClick, isLoggedIn, user }) => (
  <div className="sidenav-wrapper">
    <div id="logo">
      <Link to="/home">Home</Link>
    </div>
    {isLoggedIn ? (
      <React.Fragment>
        <div id="myTools">
          <h3>My Tools</h3>
          <Link to="/tasks">Tasks</Link>
          <Link to="/grocery">Groceries</Link>
          <Link to="/groups">My Groups</Link>
        </div>
        <div className="account-box">
        <Link to="/account"><img src={user.avatarUrl}></img></Link>
        <div className="accountlinks">
          <div>{user.firstName} {user.lastName}</div>
          <Link to="/account">My Account</Link>
          <a href="#" onClick={handleClick}>
            Sign Out
          </a>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="accountlinks">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </React.Fragment>
    )}
  </div>
);

const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
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
  isLoggedIn: PropTypes.bool.isRequired,
};
