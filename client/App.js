import React from "react";
import { SideNav } from "./components";
import {BottomNav} from './components'
import Routes from "./routes";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import "./App.css";

const App = ({isLoggedIn}) => {
  return (
    <div className="app-wrap">
      <div id={isLoggedIn ? "sidenav" : "hiddennav"}>
        <SideNav/>
        </div>
        <div id="sitebody">
      <Routes />
      <BottomNav/>
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

