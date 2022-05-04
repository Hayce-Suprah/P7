const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define("comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 3,
    },
  },
});

sequelize.sync();

module.exports = Comment;
