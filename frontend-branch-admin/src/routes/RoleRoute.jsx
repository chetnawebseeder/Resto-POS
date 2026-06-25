import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useSelector((s) => s.auth);
  if (!isAuthenticated) {
    window.location.href = "http://localhost:5173/login";
    return null;
  }
  if (!allowedRoles.includes(role)) {
    window.location.href = "http://localhost:5173/login";
    return null;
  }
  return <Outlet />;
}