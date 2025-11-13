/**const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // database name
  process.env.DB_USER,     // username
  process.env.DB_PASS,     // password
  {
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ MySQL connected"))
  .catch(err => console.error("❌ DB connection error:", err));

module.exports = sequelize;**/

/**const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("farmago", "root", "aashumysql@25", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection failed:", err));

module.exports = sequelize;**/

// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("farmago", "root", "aashumysql@25", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB connection failed:", err));

module.exports = sequelize;


