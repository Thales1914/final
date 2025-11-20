import api from "./api";

// CLIENTE
export function getProducts() {
  return api.get("/products");
}

// ADMIN
export function getAllProductsAdmin() {
  return api.get("/products/admin");
}

export function createProduct(data) {
  return api.post("/products", data);
}

export function updateProduct(id, data) {
  return api.put(`/products/${id}`, data);
}

export function deleteProduct(id) {
  return api.delete(`/products/${id}`);
}
