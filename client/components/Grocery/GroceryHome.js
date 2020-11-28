import React from "react";
import AddGrocery from "./AddGrocery";
import GroceryFooter from "./GroceryFooter";
import GroceryList from "./GroceryList";

const GroceryHome = () => (
  <div className="grocery-home">


    <div className="list">
      <AddGrocery />
      <GroceryList groceries={[]} />
      <GroceryFooter />
    </div>
  </div>
);

export default GroceryHome;
