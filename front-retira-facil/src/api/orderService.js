import api from "./api";

export function createOrder(data) {
  return api.post("/orders", data);
}

export function getOrders() {
  return api.get("/orders");
}

export function updateOrderStatus(orderId, status) {
  return api.put(`/orders/${orderId}/status`, { status });
}
