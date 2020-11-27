import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const Home = (props) => {
  const {isLoggedIn, firstName} = props;

  return (
    <div> <h3>Welcome, {isLoggedIn ? firstName : "Guest"}</h3>
    </div>
  );
};

const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    isLoggedIn: !!state.user.id,
  };
};

export default connect(mapState)(Home);

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
