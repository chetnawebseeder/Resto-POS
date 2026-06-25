// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// export default function RoleRoute({ allowedRoles }) {
//   const { isAuthenticated, role } = useSelector((s) => s.auth);
//   if (!isAuthenticated) {
//     window.location.href = "https://resto-pos-scsg.vercel.app/login";
//     return null;
//   }
//   if (!allowedRoles.includes(role)) {
//     window.location.href = "https://resto-pos-lyart.vercel.app//login";
//     return null;
//   }
//   return <Outlet />;
// }


import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useSelector((s) => s.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {

    if (role === "super_admin") {
      window.location.href = "https://resto-pos-lyart.vercel.app/super-admin/dashboard";
    } else if (role === "branch_admin") {
      window.location.href = "https://resto-pos-scsg.vercel.app/branch-admin/dashboard";
    }
    return null;
  }

  return <Outlet />;
}