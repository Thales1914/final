const Product = require("../models/Product");

module.exports = {
  listar() {
    return Product.findAll({
      where: { active: true },
      order: [["name", "ASC"]],
    });
  },

  listarTodos() {
    // para o admin ver até inativos
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
