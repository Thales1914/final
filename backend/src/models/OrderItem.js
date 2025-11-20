const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = OrderItem;
