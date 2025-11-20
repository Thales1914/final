import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Bem-vindo ao Retira Fácil</h1>

      <p className="text-center">
        Sistema para realizar pedidos de materiais e agendar retirada.
      </p>

      <div className="text-center mt-4">
        <Link to="/produtos" className="btn btn-primary btn-lg">
          Ver Produtos
        </Link>
      </div>
    </div>
  );
}
