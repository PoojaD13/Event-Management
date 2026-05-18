// // import { useSelector } from "react-redux";
// // import { Navigate } from "react-router-dom";

// // export default function ProtectedRoute({ children, allowedRoles }) {
// //   const { isAuthenticated, role } = useSelector((state) => state.auth);

// //   if (!isAuthenticated) {
// //     return <Navigate to="/login" />;
// //   }

// //   if (allowedRoles && !allowedRoles.includes(role)) {
// //     return <Navigate to="/" />;
// //   }

// //   return children;
// // }

// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const { user, token } = useSelector((state) => state.auth);

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }


import { useSelector } from "react-redux"; 
import { Navigate, Outlet, useLocation } from "react-router-dom"; 

export default function ProtectedRoute({ allowedRoles }) { 
  const { user, token } = useSelector((state) => state.auth); 
  const location = useLocation();

  // 1. Check for a valid session token string
  const activeToken = token || localStorage.getItem("token");

  if (!activeToken) { 
    // Redirect unauthenticated guests back to the login terminal layout
    return <Navigate to="/login" state={{ from: location }} replace />; 
  } 

  // 2. Safely resolve your user profile structure parameter fields
  const userProfile = user?.data?.user || user?.user || user;
  const currentRole = userProfile?.role ? String(userProfile.role).toLowerCase() : "";

  // 3. Enforce permission walls across custom system user roles
  if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(currentRole)) { 
    return <Navigate to="/" replace />; 
  } 

  // 4. ✅ FIX: React Router DOM requires Outlet to mount wrapped child components
  return <Outlet />; 
}
