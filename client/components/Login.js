import React from "react";
// import { connect } from "react-redux";

class Login extends React.Component {
  render() {
    return (
      <div id="auth-wrapper">
      <div id="login-wrapper">
        <h4>Login To Your Account</h4>
        <form onSubmit={handleSubmit} name={name} id="in-form">
          <div id="login-input">
            <label htmlFor="email" id="authlabel">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              id="authinput"
            />
          </div>
          <div className="login-input">
            <label htmlFor="password" id="authlabel">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              id="authinput"
            />
          </div>

          {error && error.response && <div> {error.response.data} </div>}

          <button type="submit" id="login-button">
            Sign In
          </button>
        </form>
        <small>Forgot your password?</small>
        <a href="/auth/google">
          <button className="googleButton">
            <b>Sign in With Google</b>
          </button>
        </a>
      </div>
    </div>
);
  }
}
const mapLogin = (state) => {
  return {
    error: state.user.error,
  };
};
const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password));
    },
  };
};

// export default connect(mapLogin, mapDispatch)(Login);
export default Login;
