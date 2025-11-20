import { useEffect, useState } from "react";
import { useScheduleController } from "../../controllers/useScheduleController";

export default function SchedulesAdmin() {
  const { schedules, fetchSchedulesAdmin, createNewSchedule, updateExistingSchedule, deleteExistingSchedule } =
    useScheduleController();

  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchSchedulesAdmin();
  }, []);

  function openForm(slot = null) {
    setModalData(slot);
  }

  async function save(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    if (modalData) {
      await updateExistingSchedule(modalData.id, data);
    } else {
      await createNewSchedule(data);
    }

    fetchSchedulesAdmin();
    setModalData(null);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Horários de Retirada</h2>

      <button className="btn btn-success mb-3" onClick={() => openForm()}>
        Novo Horário
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Capacidade</th>
            <th>Usados</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {schedules.map((s) => (
            <tr key={s.id}>
              <td>{s.date}</td>
              <td>{s.time}</td>
              <td>{s.capacity}</td>
              <td>{s.currentOrders}</td>

              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => openForm(s)}>
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteExistingSchedule(s.id).then(fetchSchedulesAdmin)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData !== null && (
        <div className="modal fade show d-block" style={{ background: "#0004" }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h4>{modalData ? "Editar Horário" : "Novo Horário"}</h4>

              <form onSubmit={save}>
                <input className="form-control mb-2" name="date" type="date" defaultValue={modalData?.date} />
                <input className="form-control mb-2" name="time" type="time" defaultValue={modalData?.time} />
                <input className="form-control mb-2" name="capacity" defaultValue={modalData?.capacity} />

                <button className="btn btn-success me-2">Salvar</button>
                <button className="btn btn-secondary" onClick={() => setModalData(null)}>Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
