import { useEffect } from "react";
import { useScheduleController } from "../../controllers/useScheduleController";
import { useNavigate } from "react-router-dom";

export default function SelectSchedule() {
  const { schedules, fetchAvailableSchedules } = useScheduleController();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableSchedules();
  }, []);

  function escolher(slot) {
    localStorage.setItem("selectedSlot", JSON.stringify(slot));
    navigate("/checkout");
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Escolha o horário de retirada</h2>

      <div className="list-group">
        {schedules.map((slot) => (
          <button
            key={slot.id}
            className="list-group-item list-group-item-action"
            onClick={() => escolher(slot)}
          >
            <strong>{slot.date}</strong> — {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}
