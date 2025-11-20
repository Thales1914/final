import api from "./api";

export function loginAdmin(credentials) {
  return api.post("/admin/login", credentials);
}
