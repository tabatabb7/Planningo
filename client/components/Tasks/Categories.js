import React, { Component } from "react";

function Categories(props) {
  let chosenGroup = this.props.chosenGroup;
  return (
    <div id="task-box-categories">
      <h3 id="cat-title">Category</h3>
      {chosenGroup & (chosenGroup.length > 0)
        ? chosenGroup.categories
          ? chosenGroup.categories.map((category) => (
              <div key={category.id} className="each-cat-wrap">
                <div
                  id="cat-icon-wrap"
                  style={{ backgroundColor: category.color }}
                >
                  <img src={category.imageUrl} className="cat-icon"></img>
                </div>
                {category.name}
              </div>
            ))
          : "null"
        : "null"}
    </div>
  );
}

export default Categories;
