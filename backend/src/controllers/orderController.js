const orderService = require("../services/orderService");

// Função util para validação simples de email
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
      const { studentName, registration, guardianEmail, pickupSlotId, items } =
        req.body;

      // ---------------------- VALIDACOES --------------------------

      if (!studentName || studentName.trim().length < 2) {
        return res.status(400).json({ error: "Nome do aluno inválido." });
      }

      if (!registration || registration.trim().length < 1) {
        return res.status(400).json({ error: "Matrícula é obrigatória." });
      }

      if (!guardianEmail || !validarEmail(guardianEmail)) {
        return res.status(400).json({ error: "Email inválido." });
      }

      if (!pickupSlotId || isNaN(Number(pickupSlotId))) {
        return res.status(400).json({ error: "Horário inválido." });
      }

      if (!Array.isArray(items) || items.length === 0) {
        return res
          .status(400)
          .json({ error: "O pedido deve conter pelo menos um item." });
      }

      for (const item of items) {
        if (!item.productId || isNaN(Number(item.productId))) {
          return res
            .status(400)
            .json({ error: "Produto inválido no pedido." });
        }

        if (!item.quantity || item.quantity <= 0) {
          return res
            .status(400)
            .json({ error: "Quantidade inválida em um dos itens." });
        }
      }

      // ---------------------- CHAMADA AO SERVIÇO --------------------------

      const order = await orderService.criarPedido(req.body);
      res.status(201).json(order);

    } catch (err) {
      console.error(err);
      res.status(400).json({
        error: err.message || "Erro ao criar pedido",
      });
    }
  },

  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: "Status é obrigatório." });
      }

      const atualizado = await orderService.atualizarStatus(id, status);

      if (!atualizado) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      res.json(atualizado);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar status do pedido" });
    }
  },
};
