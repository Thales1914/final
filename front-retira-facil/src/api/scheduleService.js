import api from "./api";

// CLIENTE
export function getAvailableSchedules() {
  return api.get("/schedules");
}

// ADMIN
export function getAllSchedules() {
  return api.get("/schedules/admin");
}

export function createSchedule(data) {
  return api.post("/schedules", data);
}

export function updateSchedule(id, data) {
  return api.put(`/schedules/${id}`, data);
}

export function deleteSchedule(id) {
  return api.delete(`/schedules/${id}`);
}
