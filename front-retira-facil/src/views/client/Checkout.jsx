import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useOrderController } from "../../controllers/useOrderController";
import { useScheduleController } from "../../controllers/useScheduleController";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const {
    cart,
    schedule,
    removeFromCart,
    selectSchedule,
    clearCart
  } = useCart();

  const { schedules, fetchSchedulesClient } = useScheduleController();
  const { createOrder } = useOrderController();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedulesClient();
  }, []);

  function formatarDataBR(date) {
    if (!date) return "";
    const [ano, mes, dia] = date.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  async function finalizar(e) {
    e.preventDefault();

    if (!schedule) {
      alert("Selecione um horário antes de finalizar o pedido.");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const data = Object.fromEntries(new FormData(e.target));

    data.items = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    data.pickupSlotId = schedule.id;

    try {
      await createOrder(data);
      clearCart();
      navigate("/pedido/sucesso");
    } catch (err) {
      console.error("DEBUG ERRO BACKEND:", err.response?.data);
      alert(err.response?.data?.error || "Erro ao finalizar pedido.");
    }
  }

  return (
    <div className="container page-area fade-in">

      <h2 className="section-title">Finalizar Pedido</h2>

      <div className="card-custom mb-4">
        <h4 className="mb-3">Itens do Carrinho</h4>

        {cart.length === 0 && <p className="text-muted">Seu carrinho está vazio.</p>}

        {cart.map((item) => (
          <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
            <div>
              {item.name} <span className="text-muted">(x{item.quantity})</span>
            </div>
            <div className="d-flex align-items-center gap-3">

              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>

              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card-custom mb-4">
        <h4 className="mb-3">Selecione um Horário</h4>

        {schedules.map((s) => (
          <button
            key={s.id}
            className={`btn w-100 mb-2 ${schedule?.id === s.id ? "btn-success" : "btn-primary"}`}
            onClick={() => selectSchedule({ id: s.id, date: s.date, time: s.time })}
          >
            {formatarDataBR(s.date)} • {s.time}
          </button>
        ))}
      </div>

      <div className="card-custom">
        <h4 className="mb-3">Seus Dados</h4>

        <form onSubmit={finalizar}>
          <label>Nome do Aluno</label>
          <input
            name="studentName"
            className="form-control"
            required
            pattern="^[A-Za-zÀ-ÿ ]+$"
            title="O nome deve conter apenas letras."
          />

          <label className="mt-3">Matrícula</label>
          <input
            name="registration"
            className="form-control"
            required
            pattern="^[0-9]+$"
            title="A matrícula deve conter apenas números."
          />

          <label className="mt-3">Email do Responsável</label>
          <input
            name="guardianEmail"
            type="email"
            className="form-control"
            required
            title="Digite um e-mail válido."
          />

          <label className="mt-3">Horário Selecionado</label>
          <input
            className="form-control"
            readOnly
            value={schedule ? `${formatarDataBR(schedule.date)} • ${schedule.time}` : "Nenhum horário selecionado"}
          />

          <button className="btn btn-primary mt-4" type="submit" disabled={!schedule || cart.length === 0}>
            Finalizar Pedido
          </button>
        </form>
      </div>

    </div>
  );
}
