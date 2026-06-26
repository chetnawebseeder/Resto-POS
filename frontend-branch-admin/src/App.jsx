import { Routes, Route, Navigate } from "react-router-dom";
import RoleRoute from "./routes/RoleRoute";
import AdminLayout from "./components/layout/AdminLayout";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/branch-admin/Dashboard/Dashboard";
import Tables from "./pages/branch-admin/Tables/Tables";
import Menu from "./pages/branch-admin/Menu/Menu";
import Orders from "./pages/branch-admin/Orders/Order";
import Billing from "./pages/branch-admin/Billing/Billing";
import Inventory from "./pages/branch-admin/Inventory/Inventory";
import Purchases from "./pages/branch-admin/Purchases/Purchases";
import Reports from "./pages/branch-admin/Reports/Reports";
import Staff from "./pages/branch-admin/Staff/Staff";
import Settings from "./pages/branch-admin/Settings/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route element={<RoleRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/branch-admin/dashboard" element={<Dashboard />} />
          <Route path="/branch-admin/tables" element={<Tables />} />
          <Route path="/branch-admin/menu" element={<Menu />} />
          <Route path="/branch-admin/orders" element={<Orders />} />
          <Route path="/branch-admin/billing" element={<Billing />} />
          <Route path="/branch-admin/inventory" element={<Inventory />} />
          <Route path="/branch-admin/purchases" element={<Purchases />} />
          <Route path="/branch-admin/reports" element={<Reports />} />
          <Route path="/branch-admin/staff" element={<Staff />} />
          <Route path="/branch-admin/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;