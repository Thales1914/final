import { useState } from "react";
import { createOrder, getOrders, updateOrderStatus } from "../api/orderService";

export function useOrderController() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao carregar pedidos.");
    }
  }

  // Corrigido + tratamento de erro
  async function createOrderController(orderData) {
    try {
      return await createOrder(orderData);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao criar pedido.");
      throw err; // mantém erro para o componente parar fluxo se quiser
    }
  }

  async function changeStatus(orderId, status) {
    try {
      return await updateOrderStatus(orderId, status);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao atualizar status.");
    }
  }

  return {
    orders,
    fetchOrders,
    createOrder: createOrderController,
    changeStatus,
  };
}
