import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../views/admin/Login";
import Dashboard from "../views/admin/Dashboard";
import ProductsAdmin from "../views/admin/ProductsAdmin";
import SchedulesAdmin from "../views/admin/SchedulesAdmin";
import OrdersAdmin from "../views/admin/OrdersAdmin";

export default function AdminRoutes() {
  return (
    <Routes>
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
  );
}
