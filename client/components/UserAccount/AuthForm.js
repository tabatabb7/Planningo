import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../../store";
import { withRouter } from "react-router-dom";

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="forms">
      <div className="form_info">
        <form onSubmit={handleSubmit} name={name}>
          {displayName != "Login" ? (
            <div>
              <div className="form-input">
                <label htmlFor="firstName">
                  <small className="form-names">First Name</small>
                </label>
                <input
                  className="info-input"
                  name="firstName"
                  type="text"
                  required
                />
              </div>
              <div className="form-input">
                <label htmlFor="lastName">
                  <small className="form-names">Last Name</small>
                </label>
                <input
                  className="info-input"
                  name="lastName"
                  type="text"
                  required
                />
              </div>
            </div>
          ) : null}

          <div className="form-input">
            <label htmlFor="email">
              <small className="form-names">Email</small>
            </label>
            <input className="info-input" name="email" type="text" required />
          </div>

          <div className="form-input">
            <label htmlFor="password">
              <small className="form-names">Password</small>
            </label>
            <input
              className="info-input"
              name="password"
              type="password"
              required
            />
          </div>

          {displayName != "Login" ? (
            <div className="form-input">
              <label htmlFor="confirmPassword">
                <small className="form-names">Confirm Password</small>
              </label>
              <input
                className="info-input"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
          ) : null}
          <div className="form-input">
            <button className="login_button" type="submit">
              {displayName}
            </button>
          </div>
          <h3>
            {error && error.response && <div> {error.response.data} </div>}
          </h3>
        </form>
      </div>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;

      if (formName === "login") {
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        dispatch(auth(email, password, formName));
      } else if (formName === "signup") {
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        dispatch(auth(email, password, formName, firstName, lastName));
      }
    }
  };
};

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm));

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
