import { useEffect, useState } from "react";
import { useOrderController } from "../../controllers/useOrderController";

export default function OrdersAdmin() {
  const { orders, fetchOrders, changeStatus } = useOrderController();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function alterarStatus(id, status) {
    if (!confirm(`Tem certeza que deseja marcar como "${status}"?`)) return;

    setLoading(true);
    try {
      await changeStatus(id, status);
      await fetchOrders();
    } catch (err) {
      alert("Erro ao alterar status.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      <h2 className="section-title">Pedidos Registrados</h2>

      <div className="card-custom shadow-soft">

        <table className="table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Matrícula</th>
              <th>Email</th>
              <th>Horário</th>
              <th>Total</th>
              <th>Status</th>
              <th style={{ width: "200px" }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <>
                <tr key={o.id}>
                  <td>{o.studentName}</td>
                  <td>{o.registration}</td>
                  <td>{o.guardianEmail}</td>

                  <td>
                    {o.pickupSlot?.date}
                    <br />
                    <span className="text-muted">{o.pickupSlot?.time}</span>
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
                      disabled={loading}
                    >
                      Marcar Pronto
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => alterarStatus(o.id, "RETIRADO")}
                      disabled={loading}
                    >
                      Retirado
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => alterarStatus(o.id, "CANCELADO")}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>

                <tr className="order-items-row">
                  <td colSpan="7" style={{ paddingTop: "12px" }}>
                    <div className="order-items-title">Itens do Pedido</div>

                    {o.items.length > 0 ? (
                      <ul className="order-items-list">
                        {o.items.map((i) => (
                          <li key={i.id}>
                            <strong>{i.product?.name || "Produto removido"}</strong>{" "}
                            <span className="text-muted">(x{i.quantity})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted mb-0">
                        Nenhum item encontrado.
                      </p>
                    )}
                  </td>
                </tr>

                <tr className="order-divider-row">
                  <td colSpan="7"></td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
