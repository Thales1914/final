import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useOrderController } from "../../controllers/useOrderController";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { createNewOrder } = useOrderController();
  const navigate = useNavigate();

  const slot = JSON.parse(localStorage.getItem("selectedSlot"));

  const [form, setForm] = useState({
    studentName: "",
    registration: "",
    guardianEmail: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function confirmar() {
    const orderData = {
      ...form,
      pickupSlotId: slot.id,
      items: cart.map((c) => ({
        productId: c.id,
        quantity: c.quantity,
      })),
    };

    await createNewOrder(orderData);
    clearCart();
    navigate("/pedido/sucesso");
  }

  return (
    <div className="container py-4">
      <h2>Finalizar Pedido</h2>

      <p>
        <strong>Horário escolhido:</strong> {slot.date} — {slot.time}
      </p>

      <h4 className="mt-4">Dados do responsável</h4>

      <div className="row">
        <div className="col-md-6">
          <label>Nome do aluno</label>
          <input
            className="form-control"
            name="studentName"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label>Matrícula</label>
          <input
            className="form-control"
            name="registration"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12 mt-3">
          <label>Email do responsável</label>
          <input
            type="email"
            className="form-control"
            name="guardianEmail"
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="btn btn-success mt-4" onClick={confirmar}>
        Confirmar Pedido
      </button>
    </div>
  );
}
