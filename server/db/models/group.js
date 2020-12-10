const Sequelize = require("sequelize");
const db = require("../db");

const Group = db.define("group", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "https://picsum.photos/100/100"
  },
  color: {
    type: Sequelize.STRING,
    defaultValue: "#9FE2BF"
  }
});

module.exports = Group;
