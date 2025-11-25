import { useState } from "react";
import api from "../api/api";

export function useScheduleController() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchSchedulesClient() {
    setLoading(true);
    try {
      const res = await api.get("/schedules");
      setSchedules(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao carregar horários.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSchedulesAdmin() {
    setLoading(true);
    try {
      const res = await api.get("/schedules/admin");
      setSchedules(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao carregar horários do admin.");
    } finally {
      setLoading(false);
    }
  }

  async function createSchedule(data) {
    try {
      await api.post("/schedules", data);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao criar horário.");
      throw err;
    }
  }

  async function updateSchedule(id, data) {
    try {
      await api.put(`/schedules/${id}`, data);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao atualizar horário.");
      throw err;
    }
  }

  async function deleteSchedule(id) {
    try {
      await api.delete(`/schedules/${id}`);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao deletar horário.");
      throw err;
    }
  }

  return {
    schedules,
    loading,
    fetchSchedulesClient,
    fetchSchedulesAdmin,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
}
