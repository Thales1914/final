import { useEffect, useState } from "react";
import { useProductController } from "../../controllers/useProductController";
import { useCart } from "../../context/CartContext";

export default function Products() {
  const { products, fetchProducts } = useProductController();
  const { addToCart } = useCart();

  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container page-area fade-in">
      <h2 className="section-title">Produtos</h2>

      {products.length === 0 && (
        <div className="card-custom text-center py-4 mt-4">
          <h4 className="mb-2">Nenhum produto disponível no momento</h4>
          <p className="text-muted">
            Todos os itens estão indisponíveis.
            Volte mais tarde para verificar novamente.
          </p>
        </div>
      )}

      <div className="row mt-3">
        {products.map((p) => {
          const added = addedId === p.id;
          const esgotado = p.stock <= 0;

          return (
            <div key={p.id} className="col-md-4 mb-4">
              <div
                className="card-custom text-center position-relative"
                style={{
                  padding: "20px",
                  borderRadius: "14px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  transition: "0.25s",
                  background: "#fff",
                  animation: added ? "pulse 0.35s ease-out" : "none",
                  opacity: esgotado ? 0.7 : 1,
                }}
              >
                {esgotado && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "#dc3545",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}
                  >
                    ESGOTADO
                  </div>
                )}

                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f7f9fc",
                    borderRadius: "10px",
                    marginBottom: "15px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={
                      p.imageUrl && p.imageUrl.trim() !== ""
                        ? p.imageUrl
                        : "https://via.placeholder.com/250?text=Sem+Imagem"
                    }
                    alt={p.name}
                    style={{
                      width: "80%",
                      height: "80%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <h5 style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  {p.name}
                </h5>

                <p style={{ color: "#444", marginBottom: "18px" }}>
                  R$ {Number(p.price).toFixed(2)}
                </p>

                <button
                  className={`btn w-100 ${
                    esgotado
                      ? "btn-secondary"
                      : added
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  disabled={esgotado}
                  style={{
                    padding: "10px",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    borderRadius: "8px",
                    transition: "0.3s",
                  }}
                  onClick={() => {
                    if (esgotado) return;

                    const ok = addToCart(p);
                    if (!ok) {
                      alert("Estoque insuficiente para adicionar mais unidades.");
                      return;
                    }

                    setAddedId(p.id);
                    setTimeout(() => setAddedId(null), 1000);
                  }}
                >
                  {esgotado
                    ? "Indisponível"
                    : added
                    ? "Adicionado!"
                    : "Adicionar ao Carrinho"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.04); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
