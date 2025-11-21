import { useEffect } from "react";
import { useOrderController } from "../../controllers/useOrderController";

export default function OrdersAdmin() {
  const { orders, fetchOrders, changeStatus } = useOrderController();

  useEffect(() => {
    fetchOrders();
  }, []);

  function alterarStatus(id, status) {
    changeStatus(id, status).then(fetchOrders);
  }

  function badge(status) {
    const map = {
      EM_PREPARACAO: "warning",
      PRONTO: "info",
      RETIRADO: "success",
      CANCELADO: "danger",
    };
    return `badge bg-${map[status]}`;
  }

  const statusLabels = {
    EM_PREPARACAO: "Em preparação",
    PRONTO: "Pronto",
    RETIRADO: "Retirado",
    CANCELADO: "Cancelado",
  };

  return (
    <div className="container page-area fade-in">
      <h2 className="section-title">Gerenciar Pedidos</h2>

      <div className="card-custom shadow-soft">
        <h4 className="mb-3">Pedidos Registrados</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Matrícula</th>
              <th>Email Responsável</th>
              <th>Horário</th>
              <th>Total</th>
              <th>Status</th>
              <th style={{ width: "200px" }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.studentName}</td>
                <td>{o.registration}</td>
                <td>{o.guardianEmail}</td>

                <td>
                  {o.schedule?.date}
                  <br />
                  <span className="text-muted">{o.schedule?.time}</span>
                </td>

                <td>R$ {Number(o.total).toFixed(2)}</td>

                <td>
                  <span className={badge(o.status)}>
                    {statusLabels[o.status]}
                  </span>
                </td>

                <td className="d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => alterarStatus(o.id, "PRONTO")}
                  >
                    Marcar Pronto
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => alterarStatus(o.id, "RETIRADO")}
                  >
                    Retirado
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => alterarStatus(o.id, "CANCELADO")}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
