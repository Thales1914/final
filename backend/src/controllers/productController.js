const productService = require("../services/productService");

module.exports = {
  async listar(req, res) {
    try {
      const produtos = await productService.listar();
      res.json(produtos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar produtos" });
    }
  },

  async listarTodos(req, res) {
    try {
      const produtos = await productService.listarTodos();
      res.json(produtos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar produtos" });
    }
  },

  async criar(req, res) {
    try {
      const produto = await productService.criar(req.body);
      res.status(201).json(produto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const atualizado = await productService.atualizar(id, req.body);
      if (!atualizado)
        return res.status(404).json({ error: "Produto não encontrado" });
      res.json(atualizado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const ok = await productService.deletar(id);
      if (!ok)
        return res.status(404).json({ error: "Produto não encontrado" });
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};
