import React from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return <div><h3>Navbar</h3>
     <Link to="/home">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>

    </div>;
  }
}const mapState = (state) => {
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

// export default connect(mapState, mapDispatch)(Navbar);
export default Navbar;

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
