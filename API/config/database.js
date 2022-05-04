const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

try {
  sequelize.authenticate();
  console.log("Database is connected...");
} catch (error) {
  console.error("Error connected to database...", error);
}

module.exports = sequelize;
