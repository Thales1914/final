const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Order = sequelize.define("Order", {
  studentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guardianEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("EM_PREPARACAO", "PRONTO", "RETIRADO", "CANCELADO"),
    defaultValue: "EM_PREPARACAO",
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Order;
