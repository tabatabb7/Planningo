import React from "react";
import { SideNav } from "./components";
import Routes from "./routes";
import "./components/styles/App.css";

const App = () => {
  return (
    <div className="app-wrap">
        <SideNav/>
        <div id="sitebody">
      <Routes /></div>
    </div>
  );
};

export default App;
