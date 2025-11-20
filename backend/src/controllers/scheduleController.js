const scheduleService = require("../services/scheduleService");

module.exports = {
  async listar(req, res) {
    try {
      const slots = await scheduleService.listarTodos();
      res.json(
        slots.map((s) => ({
          id: s.id,
          date: s.date,
          time: s.time,
          capacity: s.capacity,
          currentOrders: s.currentOrders,
          available: s.capacity - s.currentOrders,
        }))
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar horários" });
    }
  },

  async listarDisponiveis(req, res) {
    try {
      const slots = await scheduleService.listarTodos();
      const disponiveis = slots
        .map((s) => ({
          id: s.id,
          date: s.date,
          time: s.time,
          capacity: s.capacity,
          currentOrders: s.currentOrders,
          available: s.capacity - s.currentOrders,
        }))
        .filter((s) => s.available > 0);

      res.json(disponiveis);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar horários disponíveis" });
    }
  },

  async criar(req, res) {
    try {
      const slot = await scheduleService.criar(req.body);
      res.status(201).json(slot);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar horário" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const atualizado = await scheduleService.atualizar(id, req.body);
      if (!atualizado)
        return res.status(404).json({ error: "Horário não encontrado" });
      res.json(atualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar horário" });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const ok = await scheduleService.deletar(id);
      if (!ok)
        return res.status(404).json({ error: "Horário não encontrado" });
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar horário" });
    }
  },
};
