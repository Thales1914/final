const { sequelize } = require("../sequelize");
const Product = require("./Product");
const PickupSlot = require("./PickupSlot");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const AdminUser = require("./AdminUser");

// Order ↔ PickupSlot
PickupSlot.hasMany(Order, {
  foreignKey: "pickupSlotId",
  as: "orders",
});
Order.belongsTo(PickupSlot, {
  foreignKey: "pickupSlotId",
  as: "pickupSlot",
});

// Order ↔ OrderItem
Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
});
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
});

// Product ↔ OrderItem
Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "orderItems",
});
OrderItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

module.exports = {
  sequelize,
  Product,
  PickupSlot,
  Order,
  OrderItem,
  AdminUser,
};
