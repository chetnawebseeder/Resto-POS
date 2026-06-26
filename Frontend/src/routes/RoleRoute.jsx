import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "super_admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}