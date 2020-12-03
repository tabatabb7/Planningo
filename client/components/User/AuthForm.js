import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../../store";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./authform.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="forms">
          <div className="form-container">

      <div className="form-info">
        <form onSubmit={handleSubmit} name={name}>
          <h1 id="authtitle">{displayName}</h1>
          {displayName != "Login" ? (
            <div>
              <div className="form-input">
                <label htmlFor="firstName">
                  <small className="form-names">
                    <div className="form-icon">
                      <FontAwesomeIcon icon={faUserCircle} />
                    </div>
                  </small>
                </label>
                <input
                  className="info-input"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  required
                />
              </div>

              <div className="form-input">
                <label htmlFor="lastName">
                  <small className="form-names"><div className="form-icon">
                      <FontAwesomeIcon icon={faUserCircle} />
                    </div></small>
                </label>
                <input
                  className="info-input"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
          ) : null}

          <div className="form-input">
            <label htmlFor="email">
              <small className="form-names">     <div className="form-icon">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div></small>
            </label>
            <input
              className="info-input"
              name="email"
              placeholder="Email address"
              type="text"
              required
            />
          </div>

          <div className="form-input">
            <label htmlFor="password">
              <small className="form-names"><div className="form-icon">
                      <FontAwesomeIcon icon={faKey} />
                    </div></small>
            </label>
            <input
              className="info-input"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          {/*
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
          ) : null} */}
          <div id="button-wrap">
            <button className="form-button" type="submit">
              {displayName}
            </button>
          </div>
        </form>
        <h4>{error && error.response && <div> {error.response.data} </div>}</h4>
      </div>
      <div id="auth-link-container">
      <a href="/auth/google">{displayName} with Google</a>
      <div id="login-or-signup">
        {displayName === "Login" ? (
          <div>
            No account? <Link to="/signup">Sign Up</Link>
          </div>
        ) : (
          <div>
            Have an account? <Link to="/login">Login</Link>
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
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
    },
  };
};

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm));

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
