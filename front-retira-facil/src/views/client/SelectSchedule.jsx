import { useEffect } from "react";
import { useScheduleController } from "../../controllers/useScheduleController";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function SelectSchedule() {
  const { schedules, fetchSchedules } = useScheduleController();
  const navigate = useNavigate();
  const { setSchedule } = useCart();

  useEffect(() => {
    fetchSchedules();
  }, []);

  function escolher(horario) {
    setSchedule(horario);
    navigate("/checkout");
  }

  return (
    <div className="container page-area fade-in">
      <h2 className="section-title">Selecione um Horário</h2>

      <div className="card-custom">
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Horário</th>
              <th>Disponíveis</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {schedules.map((h) => (
              <tr key={h.id}>
                <td>{h.date}</td>
                <td>{h.time}</td>
                <td>{h.available}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => escolher(h)}
                  >
                    Escolher
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
