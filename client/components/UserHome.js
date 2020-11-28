import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


export const UserHome = props => {
  const { firstName } = props;

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <h4>This is your dashboard. Here, you can access all of your productivity tools.</h4>

      <Link to="/grocery">Grocery List</Link>
      <Link to="/tasks">Tasks</Link>
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
