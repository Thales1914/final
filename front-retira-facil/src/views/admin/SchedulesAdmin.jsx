import { useEffect, useState } from "react";
import { useScheduleController } from "../../controllers/useScheduleController";

export default function SchedulesAdmin() {
  const {
    schedules,
    fetchSchedulesAdmin,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  } = useScheduleController();

  const [form, setForm] = useState({
    id: null,
    date: "",
    time: "",
    capacity: "",
  });

  useEffect(() => {
    fetchSchedulesAdmin();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function editar(h) {
    setForm({
      id: h.id,
      date: h.date,
      time: h.time,
      capacity: h.capacity,
    });
  }

  function limpar() {
    setForm({
      id: null,
      date: "",
      time: "",
      capacity: "",
    });
  }

  async function salvar(e) {
    e.preventDefault();

    const data = {
      date: form.date,
      time: form.time,
      capacity: Number(form.capacity),
    };

    if (form.id) {
      await updateSchedule(form.id, data);
    } else {
      await createSchedule(data);
    }

    limpar();
    fetchSchedulesAdmin();
  }

  return (
    <div className="container page-area fade-in">

      <h2 className="section-title">Gerenciar Horários</h2>

      {/* FORMULÁRIO */}
      <div className="card-custom">
        <h4 className="mb-3">{form.id ? "Editar Horário" : "Novo Horário"}</h4>

        <form onSubmit={salvar} className="row g-3">

          <div className="col-md-4">
            <label className="form-label">Data</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Horário</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Capacidade</label>
            <input
              type="number"
              className="form-control"
              name="capacity"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 d-flex gap-2 mt-2">
            <button className="btn btn-success">
              {form.id ? "Salvar Alterações" : "Criar Horário"}
            </button>

            {form.id && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={limpar}
              >
                Cancelar Edição
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABELA */}
      <div className="card-custom">
        <h4 className="mb-3">Horários Existentes</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Horário</th>
              <th>Capacidade</th>
              <th>Pedidos</th>
              <th>Disponíveis</th>
              <th style={{ width: "180px" }}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {schedules.map((h) => (
              <tr key={h.id}>
                <td>{h.date}</td>
                <td>{h.time}</td>
                <td>{h.capacity}</td>
                <td>{h.currentOrders}</td>
                <td>{h.available}</td>

                <td className="d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => editar(h)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteSchedule(h.id).then(fetchSchedulesAdmin)
                    }
                  >
                    Excluir
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
