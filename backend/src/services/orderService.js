const { sequelize } = require("../sequelize");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");
const PickupSlot = require("../models/PickupSlot");

module.exports = {
  listarAtivos() {
    return Order.findAll({
      include: [
        { model: PickupSlot, as: "pickupSlot" },
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

  async criarPedido({ studentName, registration, guardianEmail, pickupSlotId, items }) {
    const t = await sequelize.transaction();

    try {
      // 🔒 Lock pessimista no horário para evitar concorrência
      const slot = await PickupSlot.findByPk(pickupSlotId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!slot) throw new Error("Horário não encontrado");

      // ✔ Capacidade por pedido (1 pedido = 1 vaga)
      const vagasRestantes = slot.capacity - slot.currentOrders;

      if (vagasRestantes <= 0) {
        throw new Error("Esse horário já atingiu a capacidade máxima.");
      }

      // 🔥 Criar o pedido
      const order = await Order.create(
        {
          studentName,
          registration,
          guardianEmail,
          pickupSlotId,
          status: "EM_PREPARACAO",
          total: 0,
        },
        { transaction: t }
      );

      let total = 0;

      // 🔒 Validação e lock nos produtos para evitar estoque negativo
      for (const item of items) {
        const product = await Product.findByPk(item.productId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });

        if (!product) throw new Error(`Produto não encontrado: ${item.productId}`);

        if (product.stock < item.quantity) {
          throw new Error(`Estoque insuficiente de ${product.name}`);
        }

        const unitPrice = Number(product.price);
        total += unitPrice * item.quantity;

        // Criar item do pedido
        await OrderItem.create(
          {
            orderId: order.id,
            productId: product.id,
            quantity: item.quantity,
            unitPrice,
          },
          { transaction: t }
        );

        // Atualizar estoque com segurança
        await product.update(
          { stock: product.stock - item.quantity },
          { transaction: t }
        );
      }

      // Atualizar total do pedido
      await order.update({ total }, { transaction: t });

      // ✔ Aumentar currentOrders: 1 pedido = +1
      await slot.update(
        { currentOrders: slot.currentOrders + 1 },
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
    const pedido = await Order.findByPk(id);
    if (!pedido) return null;
    return pedido.update({ status });
  },
};
