const productService = require("../services/productService");

// Aceita número decimal OU inteiro
function validarPreco(valor) {
  return /^(\d+|\d*\.\d+)$/.test(String(valor));
}

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
      const { name, category, description, price, stock, imageUrl, active } =
        req.body;

      // ---------------- VALIDAÇÕES ----------------

      if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: "Nome do produto inválido." });
      }

      if (!category || category.trim().length < 2) {
        return res.status(400).json({ error: "Categoria inválida." });
      }

      if (price == null || !validarPreco(price)) {
        return res
          .status(400)
          .json({ error: "Preço inválido. Use formatos como 10 ou 9.99." });
      }

      if (stock == null || isNaN(Number(stock)) || Number(stock) < 0) {
        return res.status(400).json({ error: "Estoque inválido." });
      }

      // -------------- CRIAÇÃO ----------------

      const produto = await productService.criar({
        name,
        category,
        description: description || "",
        price,
        stock,
        imageUrl: imageUrl || "",
        active: active !== undefined ? active : true,
      });

      res.status(201).json(produto);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { name, category, description, price, stock, imageUrl, active } =
        req.body;

      // ---------------- VALIDAÇÕES ----------------

      if (name && name.trim().length < 2) {
        return res.status(400).json({ error: "Nome inválido." });
      }

      if (category && category.trim().length < 2) {
        return res.status(400).json({ error: "Categoria inválida." });
      }

      if (price != null && !validarPreco(price)) {
        return res.status(400).json({
          error: "Preço inválido. Formatos aceitos: 10 ou 9.99.",
        });
      }

      if (stock != null && (isNaN(Number(stock)) || Number(stock) < 0)) {
        return res.status(400).json({ error: "Estoque inválido." });
      }

      // -------------- ATUALIZAÇÃO ----------------

      const atualizado = await productService.atualizar(id, {
        name,
        category,
        description,
        price,
        stock,
        imageUrl,
        active,
      });

      if (!atualizado) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

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

      if (!ok) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.status(204).send();

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};
