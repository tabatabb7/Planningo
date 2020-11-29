import React from "react";
import { SideNav } from "./components";
import {BottomNav} from './components'
import Routes from "./routes";
import "./App.css";

const App = () => {
  return (
    <div className="app-wrap">
        <SideNav/>
        <div id="sitebody">
      <Routes />
      <BottomNav/></div>

    </div>
  );
};

export default App;
