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

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchProductsAdmin();
  }, []);

  function openForm(product = null) {
    setModalData(product);
  }

  async function save(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    if (modalData) {
      await updateExistingProduct(modalData.id, data);
    } else {
      await createNewProduct(data);
    }

    fetchProductsAdmin();
    setModalData(null);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Produtos</h2>

      <button className="btn btn-success mb-3" onClick={() => openForm()}>
        Novo Produto
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>R$ {p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => openForm(p)}>
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteExistingProduct(p.id).then(fetchProductsAdmin)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData !== null && (
        <div className="modal fade show d-block" style={{ background: "#0004" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h4>{modalData ? "Editar Produto" : "Novo Produto"}</h4>

              <form onSubmit={save}>
                <input className="form-control mb-2" name="name" placeholder="Nome" defaultValue={modalData?.name} />
                <input className="form-control mb-2" name="price" placeholder="Preço" defaultValue={modalData?.price} />
                <input className="form-control mb-2" name="stock" placeholder="Estoque" defaultValue={modalData?.stock} />
                <input className="form-control mb-2" name="category" placeholder="Categoria" defaultValue={modalData?.category} />
                <input className="form-control mb-2" name="imageUrl" placeholder="URL da imagem" defaultValue={modalData?.imageUrl} />

                <button className="btn btn-success me-2">Salvar</button>
                <button className="btn btn-secondary" onClick={() => setModalData(null)}>Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
