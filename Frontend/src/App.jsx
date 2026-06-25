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

const Placeholder = ({ name }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
    <p className="mt-2 text-slate-500">{name}</p>
  </div>
);

function RoleRedirect() {
  const { isAuthenticated, role } = useSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const MAP = {
    [ROLES.SUPER_ADMIN]:  "/super-admin/dashboard",
    [ROLES.BRANCH_ADMIN]: "/branch/dashboard",
    [ROLES.RECEPTIONIST]: "/pos",
    [ROLES.WAITER]:       "/waiter/tables",
    [ROLES.KDS]:          "/kds",
  };
  return <Navigate to={MAP[role] || "/login"} replace />;
}

export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

     
      <Route element={<RoleRoute allowedRoles={[ROLES.SUPER_ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/super-admin/dashboard" element={<Dashboard />} />
          <Route path="/super-admin/branches"  element={<Branches />} />
          <Route path="/super-admin/users"     element={<Users />} />
          <Route path="/super-admin/reports"   element={<Reports />} />
          <Route path="/super-admin/settings"  element={<Settings />} />
        </Route>
      </Route>

      
      <Route element={<RoleRoute allowedRoles={[ROLES.BRANCH_ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/branch/dashboard" element={<Placeholder name="Branch Dashboard" />} />
          <Route path="/branch/menu"      element={<Placeholder name="Menu Management" />} />
          <Route path="/branch/orders"    element={<Placeholder name="Orders" />} />
          <Route path="/branch/tables"    element={<Placeholder name="Tables" />} />
          <Route path="/branch/staff"     element={<Placeholder name="Staff" />} />
          <Route path="/branch/reports"   element={<Placeholder name="Branch Reports" />} />
          <Route path="/branch/settings"  element={<Placeholder name="Branch Settings" />} />
        </Route>
      </Route>

     
      <Route path="/" element={<RoleRedirect />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}