import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const UserGroups = props => {

  return (
    <div>
      <h3>You are not a part of any groups.</h3>
      <h4>? What are groups ?</h4>
      <h3>Create Group</h3>
      <h3>Join Group</h3>
    </div>
  );
};

const mapState = state => {
  return {
    firstName: state.user.firstName
  };
};

export default connect(mapState)(UserGroups);

UserGroups.propTypes = {
  firstName: PropTypes.string
};
