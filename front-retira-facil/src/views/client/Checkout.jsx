import { useCart } from "../../context/CartContext";
import { useOrderController } from "../../controllers/useOrderController";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, schedule, clearCart } = useCart();
  const { createOrder } = useOrderController();
  const navigate = useNavigate();

  async function finalizar(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    data.products = cart;
    data.scheduleId = schedule.id;

    await createOrder(data);
    clearCart();
    navigate("/pedido/sucesso");
  }

  return (
    <div className="container page-area fade-in">

      <h2 className="section-title">Finalizar Pedido</h2>

      <div className="card-custom mb-4">
        <h4 className="mb-3">Resumo dos Produtos</h4>

        {cart.map((item) => (
          <div key={item.id} className="d-flex justify-content-between">
            <span>{item.name}</span>
            <span>R$ {item.price}</span>
          </div>
        ))}
      </div>

      <div className="card-custom">
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

          <button className="btn btn-success">Finalizar Pedido</button>
        </form>
      </div>
    </div>
  );
}
