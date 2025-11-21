import { useEffect } from "react";
import { useProductController } from "../../controllers/useProductController";
import ProductCard from "../../components/ProductCard";

export default function Products() {
  const { products, fetchProducts } = useProductController();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container page-area fade-in">
      <h2 className="section-title">Produtos</h2>

      <div className="row g-4">
        {products.map((p) => (
          <div key={p.id} className="col-md-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
