const PickupSlot = require("../models/PickupSlot");

module.exports = {
  listarTodos() {
    return PickupSlot.findAll({
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });
  },

  listarDisponiveis() {
    return PickupSlot.findAll({
      where: {
        // disponibilidade calculada no controller
      },
      order: [
        ["date", "ASC"],
        ["time", "ASC"],
      ],
    });
  },

  criar(dados) {
    return PickupSlot.create(dados);
  },

  async atualizar(id, dados) {
    const slot = await PickupSlot.findByPk(id);
    if (!slot) return null;
    return slot.update(dados);
  },

  async deletar(id) {
    const slot = await PickupSlot.findByPk(id);
    if (!slot) return null;
    await slot.destroy();
    return true;
  },
};
