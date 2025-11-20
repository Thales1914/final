import { useState } from "react";
import {
  getAvailableSchedules,
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../api/scheduleService";

export function useScheduleController() {
  const [schedules, setSchedules] = useState([]);

  async function fetchAvailableSchedules() {
    const response = await getAvailableSchedules();
    setSchedules(response.data);
  }

  async function fetchSchedulesAdmin() {
    const response = await getAllSchedules();
    setSchedules(response.data);
  }

  async function createNewSchedule(data) {
    return await createSchedule(data);
  }

  async function updateExistingSchedule(id, data) {
    return await updateSchedule(id, data);
  }

  async function deleteExistingSchedule(id) {
    return await deleteSchedule(id);
  }

  return {
    schedules,
    fetchAvailableSchedules,
    fetchSchedulesAdmin,
    createNewSchedule,
    updateExistingSchedule,
    deleteExistingSchedule,
  };
}
