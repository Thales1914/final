import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();

  if (!token) {
    return (
      <div className="container page-area fade-in">
        <h3 className="text-danger">Acesso Negado</h3>
        <p>Você precisa estar logado para acessar o painel.</p>

        <Link to="/admin" className="btn btn-primary mt-3">
          Ir para Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container page-area fade-in">

      <h2 className="section-title mb-4">Painel Administrativo</h2>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card-custom text-center">
            <h5>Gerenciar Produtos</h5>
            <Link to="/admin/produtos" className="btn btn-primary w-100 mt-3">
              Acessar
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-custom text-center">
            <h5>Gerenciar Horários</h5>
            <Link to="/admin/horarios" className="btn btn-primary w-100 mt-3">
              Acessar
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-custom text-center">
            <h5>Gerenciar Pedidos</h5>
            <Link to="/admin/pedidos" className="btn btn-primary w-100 mt-3">
              Acessar
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
