import React from "react";
import { Link } from "react-router-dom";

class Shopping extends React.Component {
  render() {
    return (
      <div>
        <Link to="/grocery">Groceries</Link>
        <p>Entertainment</p>
        <p>Home</p>
        <p>Personal</p>
      </div>
    );
  }
}

export default Shopping;
