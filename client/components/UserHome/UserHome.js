import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";

class UserHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { firstName } = this.props;

    return (
      <div className="userhome-wrapper">
        hello world
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
  };
};

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  firstName: PropTypes.string,
};
