import { useEffect } from "react";
import { useScheduleController } from "../../controllers/useScheduleController";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function SelectSchedule() {
  const { schedules, fetchSchedulesClient } = useScheduleController();
  const { selectSchedule } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedulesClient();
  }, []);

  return (
    <div className="container page-area fade-in">
      <h2 className="section-title">Selecione um Horário</h2>

      <div className="card-custom">
        {schedules.map((s) => (
          <button
            key={s.id}
            className="btn btn-primary w-100 mb-2"
            onClick={() => {
              selectSchedule(s);   // 🔥 SALVANDO HORÁRIO NO CONTEXTO
              navigate("/checkout");
            }}
          >
            {s.time}
          </button>
        ))}
      </div>
    </div>
  );
}
