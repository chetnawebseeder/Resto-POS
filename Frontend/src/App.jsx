import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES } from "./utils/constants";
import Login from "./pages/Login/Login";
import AdminLayout from "./components/layout/AdminLayout";
import RoleRoute from "./routes/RoleRoute";
import Dashboard from "./pages/super-admin/Dashboard/Dashboard";
import Branches from "./pages/super-admin/Branches/Branches";
import Users from "./pages/super-admin/Users/Users";
import Settings from "./pages/super-admin/Settings/Settings";
import Reports from "./pages/super-admin/Reports/Reports";

function RoleRedirect() {
  const { isAuthenticated, role } = useSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role === ROLES.SUPER_ADMIN) return <Navigate to="/super-admin/dashboard" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route element={<RoleRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/super-admin/dashboard" element={<Dashboard />} />
          <Route path="/super-admin/branches"  element={<Branches />} />
          <Route path="/super-admin/users"     element={<Users />} />
          <Route path="/super-admin/reports"   element={<Reports />} />
          <Route path="/super-admin/settings"  element={<Settings />} />
        </Route>
      </Route>

      <Route path="/" element={<RoleRedirect />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}