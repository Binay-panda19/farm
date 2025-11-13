const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("User");
const Equipment = require("./Equipment");

const Booking = sequelize.define("Booking", {
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  duration: { type: DataTypes.ENUM("Hourly","Daily"), allowNull: false },
  status: { type: DataTypes.ENUM("Pending","Confirmed","Completed"), defaultValue: "Pending" }
});

// Each Booking belongs to a Renter and an Equipment
Booking.belongsTo(User, { as: "renter", foreignKey: "renterId" });
User.hasMany(Booking, { foreignKey: "renterId" });

Booking.belongsTo(Equipment, { as: "equipment", foreignKey: "equipmentId" });
Equipment.hasMany(Booking, { foreignKey: "equipmentId" });

module.exports = Booking;
