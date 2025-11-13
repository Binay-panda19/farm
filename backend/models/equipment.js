const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("User");

const Equipment = sequelize.define("Equipment", {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false }
});

// Each Equipment belongs to an Owner
Equipment.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
User.hasMany(Equipment, { foreignKey: "ownerId" });

module.exports = Equipment;
