import React from "react";
import { TopNav } from "./components";
import Routes from "./routes";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./App.css";

const App = ({ isLoggedIn }) => {
  return (
    <div className="app-wrap">
      <div id="topnav">
        <TopNav />
      </div>
      <div id="sitebody">
        <Routes />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

export default connect(mapState, null)(App);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
