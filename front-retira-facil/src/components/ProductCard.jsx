import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card-custom p-3">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="img-fluid rounded mb-3"
        style={{ maxHeight: "180px", objectFit: "cover" }}
      />

      <h5>{product.name}</h5>
      <small className="text-muted">{product.category}</small>

      <p className="mt-2 fw-bold">R$ {product.price}</p>

      <button
        className="btn btn-primary w-100 mt-3"
        onClick={() => addToCart(product)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
