import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "../views/client/Home";
import Products from "../views/client/Products";
import SelectSchedule from "../views/client/SelectSchedule";
import Checkout from "../views/client/Checkout";
import OrderSuccess from "../views/client/OrderSuccess";

import Login from "../views/admin/Login";
import Dashboard from "../views/admin/Dashboard";
import ProductsAdmin from "../views/admin/ProductsAdmin";
import SchedulesAdmin from "../views/admin/SchedulesAdmin";
import OrdersAdmin from "../views/admin/OrdersAdmin";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/selecionar-horario" element={<SelectSchedule />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido/sucesso" element={<OrderSuccess />} />

          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/produtos"
            element={
              <ProtectedRoute>
                <ProductsAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/horarios"
            element={
              <ProtectedRoute>
                <SchedulesAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/pedidos"
            element={
              <ProtectedRoute>
                <OrdersAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
