const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const PickupSlot = sequelize.define("PickupSlot", {
  date: {
    type: DataTypes.DATEONLY, // '2025-11-06'
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING, // '09:00'
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentOrders: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = PickupSlot;
