import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useOrderController } from "../../controllers/useOrderController";
import { useScheduleController } from "../../controllers/useScheduleController";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, schedule, selectSchedule, clearCart } = useCart();
  const { createOrder } = useOrderController();
  const { fetchSchedulesClient, schedules } = useScheduleController();
  const navigate = useNavigate();

  const [loadingSchedules, setLoadingSchedules] = useState(true);

  // 🔵 Carregar horários do banco ao abrir a página
  useEffect(() => {
    async function load() {
      await fetchSchedulesClient();
      setLoadingSchedules(false);
    }
    load();
  }, []);

  // 🔴 Se carrinho estiver vazio, redirecionar
  if (cart.length === 0) {
    return (
      <div className="container page-area fade-in">
        <h2 className="section-title">Seu carrinho está vazio</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Voltar aos produtos
        </button>
      </div>
    );
  }

  async function finalizar(e) {
    e.preventDefault();

    if (!schedule) {
      alert("Por favor, selecione um horário antes de finalizar o pedido.");
      return;
    }

    const form = Object.fromEntries(new FormData(e.target));

    const payload = {
      studentName: form.studentName,
      registration: form.registration,
      guardianEmail: form.guardianEmail,
      pickupSlotId: schedule.id,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    await createOrder(payload);
    clearCart();
    navigate("/pedido/sucesso");
  }

  return (
    <div className="container page-area fade-in">

      <h2 className="section-title">Carrinho & Checkout</h2>

      {/* 🛒 LISTA DE PRODUTOS */}
      <div className="card-custom mb-4">
        <h4 className="mb-3">Produtos no Carrinho</h4>

        {cart.map((item) => (
          <div key={item.id} className="d-flex justify-content-between mb-2">
            <span>{item.name} (x{item.quantity})</span>
            <span>R$ {Number(item.price).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* 🕒 ESCOLHA DE HORÁRIO */}
      <div className="card-custom mb-4">
        <h4 className="mb-3">Escolha o Horário de Retirada</h4>

        {loadingSchedules && <p>Carregando horários...</p>}

        {!loadingSchedules && schedules.length === 0 && (
          <p className="text-danger">Nenhum horário disponível no momento.</p>
        )}

        {!loadingSchedules &&
          schedules.map((slot) => (
            <button
              key={slot.id}
              className={`btn w-100 mb-2 ${
                schedule?.id === slot.id ? "btn-success" : "btn-primary"
              }`}
              onClick={() => selectSchedule(slot)}
            >
              {slot.time} — Disponíveis: {slot.available}
            </button>
          ))}

        {schedule && (
          <p className="mt-2 text-success">
            Horário selecionado: <strong>{schedule.time}</strong>
          </p>
        )}
      </div>

      {/* 📝 FORMULÁRIO FINAL */}
      <div className="card-custom">
        <h4 className="mb-3">Informações do Aluno</h4>

        <form onSubmit={finalizar} className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Seu Nome</label>
            <input className="form-control" name="studentName" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Matrícula</label>
            <input className="form-control" name="registration" required />
          </div>

          <div className="col-md-12">
            <label className="form-label">Email do Responsável</label>
            <input className="form-control" name="guardianEmail" required />
          </div>

          <button
            className="btn btn-success mt-3"
            type="submit"
            disabled={!schedule}
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}
