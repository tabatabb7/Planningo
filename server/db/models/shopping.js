const Sequelize = require("sequelize");
const db = require("../db");

const Shopping = db.define("shopping", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
  },
  grocery_category: {
    type: Sequelize.ENUM('dairy', 'meat', 'vegetables', 'grains', 'seafood', 'fruits', 'other')
  },
  isBought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  details:{
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  //for uploading photos
  imageUrl: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT
  }
});

module.exports = Shopping;
