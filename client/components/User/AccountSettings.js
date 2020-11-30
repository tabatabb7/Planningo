import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { me } from "../../store";

class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formStatus: false,
    };
    this.toggleFormStatus = this.toggleFormStatus.bind(this);
  }

  componentDidMount() {
    this.props.loadInitialData();
  }
  toggleFormStatus() {
    this.setState({ formStatus: !this.state.formStatus });
  }

  render() {
    const { user } = this.props;

    return (
      <div>
       <div>
        <h3>Personal Info:</h3>
        <button onClick={this.toggleFormStatus}>
            Edit
          </button>
          {this.state.formStatus ? (<div>Change</div>):null}
        <li>Name: {user.firstName} {user.lastName}</li>
        <li>Email: {user.email}</li>
        <li>Password</li>
      </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(AccountSettings);

AccountSettings.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
