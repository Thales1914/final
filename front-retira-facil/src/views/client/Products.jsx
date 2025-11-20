import { useEffect } from "react";
import { useProductController } from "../../controllers/useProductController";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard";

export default function Products() {
  const { products, fetchProducts } = useProductController();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Produtos disponíveis</h2>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <ProductCard product={product} onAdd={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}
