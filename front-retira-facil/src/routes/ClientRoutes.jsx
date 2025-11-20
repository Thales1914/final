import { Routes, Route } from "react-router-dom";
import Home from "../views/client/Home";
import Products from "../views/client/Products";
import SelectSchedule from "../views/client/SelectSchedule";
import Checkout from "../views/client/Checkout";
import OrderSuccess from "../views/client/OrderSuccess";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/selecionar-horario" element={<SelectSchedule />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pedido/sucesso" element={<OrderSuccess />} />
    </Routes>
  );
}
