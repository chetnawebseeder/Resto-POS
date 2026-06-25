// // // src/components/RoleRoute.jsx
// // import { useSelector } from "react-redux";
// // import { Navigate, Outlet } from "react-router-dom";
// // import { ROLES } from "../utils/constants"; // यह फाइल आपकी project structure में होनी चाहिए

// // export default function RoleRoute({ allowedRoles }) {
// //   const { isAuthenticated, role } = useSelector((s) => s.auth);

// //   // 1. अगर यूज़र लॉग इन नहीं है, तो उसे लॉग इन पेज पर भेजें
// //   if (!isAuthenticated) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   // 2. अगर यूज़र का रोल allowedRoles की लिस्ट में नहीं है, तो उसे Unathorized पेज पर भेजें
// //   if (!allowedRoles.includes(role)) {
// //     return <Navigate to="/unauthorized" replace />;
// //   }

// //   // 3. सब कुछ सही है तो पेज रेंडर करें
// //   return <Outlet />;
// // }



// // import { useSelector } from "react-redux";
// // import { Navigate, Outlet } from "react-router-dom";

// // export default function RoleRoute({ allowedRoles }) {
// //   const { isAuthenticated, role } = useSelector((s) => s.auth);

// //   if (!isAuthenticated) return <Navigate to="/login" replace />;
  
// //   // Yahan check karein kya user ka role allowed roles mein hai
// //   if (!allowedRoles.includes(role)) return <Navigate to="/login" replace />;
  
// //   return <Outlet />;
// // }


// import { Navigate, Outlet } from "react-router-dom";

// export default function RoleRoute({ allowedRoles }) {
//   // Redux ka load hone ka wait mat karo, direct localStorage dekho
//   const authUser = JSON.parse(localStorage.getItem("authUser"));

//   if (!authUser) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(authUser.role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }



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