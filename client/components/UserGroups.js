import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const UserGroups = props => {

  return (
    <div>
      <h3>My Groups</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName
  };
};

export default connect(mapState)(UserGroups);

/**
 * PROP TYPES
 */
UserGroups.propTypes = {
  firstName: PropTypes.string
};
