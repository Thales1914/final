const Product = require("../models/Product");
const { Op } = require("sequelize");

module.exports = {
  // Catálogo (cliente) → só produtos ativos e com estoque disponível
  listar() {
    return Product.findAll({
      where: {
        active: true,
        stock: { [Op.gt]: 0 }, // ✔ só mostra produtos com estoque > 0
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
