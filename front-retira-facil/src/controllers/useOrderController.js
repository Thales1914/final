import { useState } from "react";
import { createOrder, getOrders, updateOrderStatus } from "../api/orderService";

export function useOrderController() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchOrders() {
    setLoading(true);
    const response = await getOrders();
    setOrders(response.data);
    setLoading(false);
  }

  async function createNewOrder(orderData) {
    return await createOrder(orderData);
  }

  async function changeStatus(orderId, status) {
    return await updateOrderStatus(orderId, status);
  }

  return {
    orders,
    loading,
    fetchOrders,
    createNewOrder,
    changeStatus,
  };
}
