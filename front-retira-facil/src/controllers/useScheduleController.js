import { useState } from "react";
import api from "../api/api";

export function useScheduleController() {
  const [schedules, setSchedules] = useState([]);

  async function fetchSchedulesAdmin() {
    const res = await api.get("/schedules/admin");
    setSchedules(res.data);
  }

  async function createSchedule(data) {
    await api.post("/schedules", data);
  }

  async function updateSchedule(id, data) {
    await api.put(`/schedules/${id}`, data);
  }

  async function deleteSchedule(id) {
    await api.delete(`/schedules/${id}`);
  }

  return {
    schedules,
    fetchSchedulesAdmin,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
}
  