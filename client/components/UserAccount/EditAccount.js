import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const EditAccount = props => {
  const { email } = props;

  return (
    <div>
      <h3>Account Settings</h3>
      <div>Change Icon</div>
      <div>Edit Info</div>
      <div>Delete Account</div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(EditAccount);

/**
 * PROP TYPES
 */
EditAccount.propTypes = {
  email: PropTypes.string
};
