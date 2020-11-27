import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {logout} from '../store';

import './styles/Navbar.css'

const Navbar = ({ handleClick, isLoggedIn, firstName }) => (
  <div className ="navbar-wrapper">
    <h3>Navbar</h3>
    <Link to="/home">Home</Link>
    {isLoggedIn ? (
      <React.Fragment>
        <a href="#" onClick={handleClick}>
          <p>logout</p>
        </a>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </React.Fragment>
    )}
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName,
  };
};
const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
