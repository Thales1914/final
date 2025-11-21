import { useEffect, useState } from "react";
import { useProductController } from "../../controllers/useProductController";

export default function ProductsAdmin() {
  const {
    products,
    fetchProductsAdmin,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  } = useProductController();

  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchProductsAdmin();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function editar(produto) {
    setForm({
      id: produto.id,
      name: produto.name,
      price: produto.price,
      stock: produto.stock,
      category: produto.category,
      imageUrl: produto.imageUrl,
    });
  }

  function limpar() {
    setForm({
      id: null,
      name: "",
      price: "",
      stock: "",
      category: "",
      imageUrl: "",
    });
  }

  async function salvar(e) {
    e.preventDefault();

    const data = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category,
      imageUrl: form.imageUrl,
    };

    if (form.id) {
      await updateExistingProduct(form.id, data);
    } else {
      await createNewProduct(data);
    }

    limpar();
    fetchProductsAdmin();
  }

  return (
    <div className="container page-area fade-in">

      {/* Título */}
      <h2 className="section-title">Gerenciar Produtos</h2>

      {/* FORMULÁRIO */}
      <div className="card-custom">
        <h4 className="mb-3">
          {form.id ? "Editar Produto" : "Novo Produto"}
        </h4>

        <form onSubmit={salvar} className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Nome</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Preço</label>
            <input
              className="form-control"
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Estoque</label>
            <input
              className="form-control"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Categoria</label>
            <input
              className="form-control"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">URL da Imagem</label>
            <input
              className="form-control"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 d-flex gap-2 mt-2">
            <button className="btn btn-success">
              {form.id ? "Salvar Alterações" : "Criar Produto"}
            </button>

            {form.id && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={limpar}
              >
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
      </div>

      {/* LISTA DE PRODUTOS */}
      <div className="card-custom">
        <h4 className="mb-3">Lista de Produtos</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th style={{ width: "180px" }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>R$ {Number(p.price).toFixed(2)}</td>
                <td>{p.stock}</td>

                <td className="d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => editar(p)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteExistingProduct(p.id).then(fetchProductsAdmin)
                    }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
