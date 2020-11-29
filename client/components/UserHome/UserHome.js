import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";


export const UserHome = props => {
  const { firstName } = props;

  return (
    <div className="userhome-wrapper">
      <h1>User Home</h1>
    </div>
  );
};

const mapState = state => {
  return {
    firstName: state.user.firstName
  };
};

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  firstName: PropTypes.string
};
