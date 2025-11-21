import { useState } from "react";
import { createOrder, getOrders, updateOrderStatus } from "../api/orderService";

export function useOrderController() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const response = await getOrders();
    setOrders(response.data);
  }

  async function createNewOrder(orderData) {
    return await createOrder(orderData);
  }

  async function changeStatus(orderId, status) {
    return await updateOrderStatus(orderId, status);
  }

  return {
    orders,
    fetchOrders,
    createNewOrder,
    changeStatus,
  };
}
