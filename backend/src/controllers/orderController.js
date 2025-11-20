const orderService = require("../services/orderService");

module.exports = {
  async listarAtivos(req, res) {
    try {
      const orders = await orderService.listarAtivos();
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar pedidos" });
    }
  },

  async criar(req, res) {
    try {
      const order = await orderService.criarPedido(req.body);
      res.status(201).json(order);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message || "Erro ao criar pedido" });
    }
  },

  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const atualizado = await orderService.atualizarStatus(id, status);
      if (!atualizado)
        return res.status(404).json({ error: "Pedido não encontrado" });
      res.json(atualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar status do pedido" });
    }
  },
};
