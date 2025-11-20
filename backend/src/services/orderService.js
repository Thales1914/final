const { sequelize } = require("../sequelize");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");
const PickupSlot = require("../models/PickupSlot");

module.exports = {
  listarAtivos() {
    return Order.findAll({
      where: {},
      include: [
        {
          model: PickupSlot,
          as: "pickupSlot",
        },
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product, as: "product" }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  },

  listarTodos() {
    return this.listarAtivos();
  },

  async criarPedido({
    studentName,
    registration,
    guardianEmail,
    pickupSlotId,
    items,
  }) {
    const t = await sequelize.transaction();

    try {
      const slot = await PickupSlot.findByPk(pickupSlotId, { transaction: t });
      if (!slot) throw new Error("Horário não encontrado");

      const disponivel = slot.capacity - slot.currentOrders;
      const totalItens = items.reduce((sum, i) => sum + i.quantity, 0);
      if (totalItens > disponivel)
        throw new Error("Não há vagas suficientes nesse horário");

      let total = 0;
      const order = await Order.create(
        {
          studentName,
          registration,
          guardianEmail,
          pickupSlotId,
          status: "EM_PREPARACAO",
          total: 0, // atualizamos depois
        },
        { transaction: t }
      );

      for (const item of items) {
        const product = await Product.findByPk(item.productId, {
          transaction: t,
        });
        if (!product) throw new Error("Produto não encontrado");

        if (product.stock < item.quantity) {
          throw new Error(`Estoque insuficiente para ${product.name}`);
        }

        const unitPrice = product.price;
        total += Number(unitPrice) * item.quantity;

        await OrderItem.create(
          {
            orderId: order.id,
            productId: product.id,
            quantity: item.quantity,
            unitPrice,
          },
          { transaction: t }
        );

        await product.update(
          { stock: product.stock - item.quantity },
          { transaction: t }
        );
      }

      await order.update({ total }, { transaction: t });

      await slot.update(
        { currentOrders: slot.currentOrders + totalItens },
        { transaction: t }
      );

      await t.commit();
      return order;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  async atualizarStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    return order.update({ status });
  },
};
