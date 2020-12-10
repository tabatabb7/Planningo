import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div
      className="homepage-wrap"
      style={{
        backgroundImage:
          "url(" + "/assets/backgrounds/coworker-bg.png" + ")",
      }}
    >
      <div id="site-home-header">
        <div id="header-wrap-home">
       <div id="navtitle">Planningo</div>

       <div id="links-home">
          <Link to="/login">
           Login / Sign Up
          </Link>
          </div>
          </div>
      </div>

      <div id="site-home-content">
        <div>What is this app?</div>
      </div>
    </div>
  );
};

export default HomePage;
