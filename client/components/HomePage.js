import React from "react";
import "./styles/HomePage.css";

export const HomePage = () => {
  return (
    <div className="homepage-wrap">
      <div className="homepage-hero">
        <h1>All of the tools you'll ever need in your life, in one place.</h1>
      </div>
      <div id="homepage-body">
        <li>How to install our app - Android - iOS</li>
        <li>About Us</li>
        <li>FAQs</li>
        <li>Getting Started</li>
      </div>
    </div>
  );
};

export default HomePage;
