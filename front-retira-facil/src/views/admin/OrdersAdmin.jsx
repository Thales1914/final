import { useEffect } from "react";
import { useOrderController } from "../../controllers/useOrderController";

export default function OrdersAdmin() {
  const { orders, fetchOrders, changeStatus } = useOrderController();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function update(id, status) {
    await changeStatus(id, status);
    fetchOrders();
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Pedidos</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Responsável</th>
            <th>Horário</th>
            <th>Total</th>
            <th>Status</th>
            <th>Itens</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.studentName}</td>
              <td>{o.guardianEmail}</td>
              <td>{o.pickupSlot?.date} — {o.pickupSlot?.time}</td>
              <td>R$ {o.total}</td>
              <td>{o.status}</td>

              <td>
                {o.items.map((i) => (
                  <div key={i.id}>
                    {i.quantity}x {i.product?.name}
                  </div>
                ))}
              </td>

              <td>
                <button className="btn btn-success btn-sm mb-1" onClick={() => update(o.id, "PRONTO")}>
                  Marcar como Pronto
                </button>

                <button className="btn btn-secondary btn-sm mb-1" onClick={() => update(o.id, "RETIRADO")}>
                  Retirado
                </button>

                <button className="btn btn-danger btn-sm" onClick={() => update(o.id, "CANCELADO")}>
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
