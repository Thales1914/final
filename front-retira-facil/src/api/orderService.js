import api from "./api";

// CLIENTE cria pedido
export function createOrder(data) {
  return api.post("/orders", data);
}

// ADMIN vê pedidos
export function getOrders() {
  return api.get("/orders");
}

// ADMIN atualiza status
export function updateOrderStatus(id, status) {
  return api.put(`/orders/${id}/status`, { status });
}
