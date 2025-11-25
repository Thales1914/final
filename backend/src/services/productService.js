const Product = require("../models/Product");
const { Op } = require("sequelize");

module.exports = {
  // Catálogo (cliente) → agora mostra todos os ativos, incluindo esgotados
  listar() {
    return Product.findAll({
      where: {
        active: true, // ❗ removemos o filtro de estoque
      },
      order: [["name", "ASC"]],
    });
  },

  // Admin → vê tudo (inclusive esgotados e inativos)
  listarTodos() {
    return Product.findAll({
      order: [["name", "ASC"]],
    });
  },

  criar(dados) {
    return Product.create(dados);
  },

  async atualizar(id, dados) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return product.update(dados);
  },

  async deletar(id) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return true;
  },
};
