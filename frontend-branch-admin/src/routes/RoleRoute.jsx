import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}