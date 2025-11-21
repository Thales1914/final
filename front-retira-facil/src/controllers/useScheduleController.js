import { useState } from "react";
import api from "../api/api";

export function useScheduleController() {
  const [schedules, setSchedules] = useState([]);

  // 🔵 ADMIN → lista todos os horários (com capacidade e pedidos)
  async function fetchSchedulesAdmin() {
    const res = await api.get("/schedules/admin");
    setSchedules(res.data);
  }

  // 🟢 CLIENTE → lista somente horários disponíveis
  // ESTA FUNÇÃO ESTAVA FALTANDO (causando erro no seu front)
  async function fetchSchedulesClient() {
    const res = await api.get("/schedules"); // rota correta do backend
    setSchedules(res.data);
  }

  // 🔵 ADMIN → criar horário
  async function createSchedule(data) {
    await api.post("/schedules", data);
  }

  // 🔵 ADMIN → atualizar horário
  async function updateSchedule(id, data) {
    await api.put(`/schedules/${id}`, data);
  }

  // 🔵 ADMIN → deletar horário
  async function deleteSchedule(id) {
    await api.delete(`/schedules/${id}`);
  }

  return {
    schedules,
    fetchSchedulesAdmin,
    fetchSchedulesClient, // 🔥 obrigado para o front funcionar
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
}
