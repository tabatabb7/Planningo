const Sequelize = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
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

module.exports = Item;
