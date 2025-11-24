import { useEffect } from "react";
import { useProductController } from "../../controllers/useProductController";
import { useCart } from "../../context/CartContext";

export default function Products() {
  const { products, fetchProducts } = useProductController();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container page-area fade-in">
      <h2 className="section-title">Produtos</h2>

      {/* Se não houver produtos disponíveis */}
      {products.length === 0 && (
        <div className="card-custom text-center py-4 mt-4">
          <h4 className="mb-2">Nenhum produto disponível no momento</h4>
          <p className="text-muted">
            Todos os itens estão indisponíveis.  
            Volte mais tarde para verificar novamente.
          </p>
        </div>
      )}

      {/* Lista de produtos */}
      <div className="row mt-3">
        {products.map((p) => (
          <div key={p.id} className="col-md-4 mb-3">
            <div className="card-custom">
              <h5>{p.name}</h5>
              <p className="text-muted mb-1">
                R$ {Number(p.price).toFixed(2)}
              </p>

              <button
                className="btn btn-primary w-100 mt-2"
                onClick={() => addToCart(p)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
