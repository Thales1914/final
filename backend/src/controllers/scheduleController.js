const scheduleService = require("../services/scheduleService");

// Validação simples para horário: "HH:MM"
function validarHora(h) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(h);
}

// Validação simples para data "YYYY-MM-DD"
function validarData(d) {
  return /^\d{4}-\d{2}-\d{2}$/.test(d);
}

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
      const { date, time, capacity } = req.body;

      // ---------------------- VALIDAÇÕES ----------------------

      if (!date || !validarData(date)) {
        return res.status(400).json({ error: "Data inválida (formato: YYYY-MM-DD)" });
      }

      if (!time || !validarHora(time)) {
        return res.status(400).json({ error: "Horário inválido (formato: HH:MM)" });
      }

      if (capacity == null || isNaN(Number(capacity)) || Number(capacity) <= 0) {
        return res.status(400).json({ error: "Capacidade deve ser um número maior que 0." });
      }

      // ---------------------- CRIAÇÃO ----------------------

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
      const { date, time, capacity } = req.body;

      // ---------------------- VALIDAÇÕES ----------------------

      if (date && !validarData(date)) {
        return res.status(400).json({ error: "Data inválida." });
      }

      if (time && !validarHora(time)) {
        return res.status(400).json({ error: "Horário inválido." });
      }

      if (capacity != null && (isNaN(Number(capacity)) || Number(capacity) <= 0)) {
        return res.status(400).json({ error: "Capacidade inválida." });
      }

      // ---------------------- ATUALIZAÇÃO ----------------------

      const atualizado = await scheduleService.atualizar(id, req.body);
      if (!atualizado) {
        return res.status(404).json({ error: "Horário não encontrado" });
      }

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

      if (!ok) {
        return res.status(404).json({ error: "Horário não encontrado" });
      }

      res.status(204).send();

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar horário" });
    }
  },
};
