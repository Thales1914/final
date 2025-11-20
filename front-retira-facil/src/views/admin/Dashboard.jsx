import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Painel Administrativo</h2>

      <div className="list-group">
        <Link to="/admin/pedidos" className="list-group-item list-group-item-action">
          Gerenciar Pedidos
        </Link>

        <Link to="/admin/produtos" className="list-group-item list-group-item-action">
          Gerenciar Produtos
        </Link>

        <Link to="/admin/horarios" className="list-group-item list-group-item-action">
          Gerenciar Horários de Retirada
        </Link>
      </div>
    </div>
  );
}
