export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card shadow-sm h-100">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.name}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="text-muted">{product.category}</p>
        <p className="card-text">{product.description}</p>

        <h4 className="text-primary fw-bold">R$ {product.price}</h4>

        <button
          className="btn btn-primary w-100 mt-2"
          onClick={() => onAdd(product)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
