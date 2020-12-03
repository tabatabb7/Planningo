import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";
import moment from "moment";

export const UserHome = (props) => {
  const { firstName } = props;
  const now = new Date();
  const currHour = moment().format("HH");


  return (
    <div className="userhome-wrapper">
      {moment(now).format("h:mm a")}
      <div id="home-top">
        <div id="user-greet">
          {(() => {
            if (currHour >= 3 && currHour < 12) {
              return <h3>Good morning, {firstName}.</h3>;
            } else if (currHour >= 12 && currHour <= 18) {
              return <h3>Good afternoon, {firstName}.</h3>;
            } else if(currHour >=18 && currHour < 24) {
              return <h3>Good evening, {firstName}.</h3>;
            } else if(currHour >=1 && currHour < 3) {
              return <h3>Good evening, {firstName}.</h3>;
            } else {
              return <h3>Hello, {firstName}.</h3>
            }
            }
          )()}
        </div>
        <div id="show-weather">
        70° F
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    firstName: state.user.firstName,
  };
};

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  firstName: PropTypes.string,
};
