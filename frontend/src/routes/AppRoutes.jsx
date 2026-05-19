// import { Routes, Route } from "react-router-dom";

// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// // import Dashboard from "../pages/dashboard/Dashboard";
// import Dashboard from "../pages/dashboard/Dashboard";

// import Events from "../pages/events/Events";
// import CreateEvent from "../pages/events/CreateEvent";
// import EventDetails from "../pages/events/EventDetails";

// import ProtectedRoute from "./ProtectedRoute";
// // 1. Add the component import at the top of your router file
// //import EventScanner from "./pages/events/EventScanner";
// import EventScanner from '../pages/events/EventScanner'

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />

//       <Route path="/register" element={<Register />} />

//       <Route
//         path="/"
//         element={
//           <ProtectedRoute allowedRoles={["admin", "organizer", "participant"]}>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route index element={<Dashboard />} />
//       <Route path="/events" element={<Events />} />
//       <Route path="/events/create" element={<CreateEvent />} />
//       <Route path="/events/:id" element={<EventDetails />} />

//       <Route path="/scanner" element={<EventScanner />} />

//       {/* <Route path="/" element={<Dashboard />} /> */}
//     </Routes>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Events from "../pages/events/Events";
import CreateEvent from "../pages/events/CreateEvent";
import EventDetails from "../pages/events/EventDetails";
import EventScanner from "../pages/events/EventScanner";
import DashboardLayout from "../layouts/DashboardLayout"; // 👈 Ensure your Layout is explicitly imported
import ProtectedRoute from "./ProtectedRoute";
import OrganizerPanel from "../components/event/OrganizerPanel";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 GUEST PUBLIC OPEN CHANNELS */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔒 SHARED PROTECTED VIEW PORTS (Requires valid JWT session data) */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "organizer", "participant"]} />}>
        {/* We nest your pages inside DashboardLayout so they inherit your Sidebar and Navbar layouts */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/scanner" element={<EventScanner />} />
        </Route>
      </Route>

      {/* 🔒 ADMINISTRATIVE MANAGEMENT CHANNELS */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "organizer"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/edit/:id" element={<CreateEvent />} />
           <Route path="/events/:id/manage" element={<OrganizerPanel />} /> {/* for the organizer operations  */}
        </Route>
      </Route>

      {/* 🔄 UNKNOWN ROOT ADDRESSES FALLBACK ANCHOR REDIRECTOR */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
