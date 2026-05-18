// import { Link } from "react-router-dom";
// import { FiHome, FiCalendar, FiUsers } from "react-icons/fi";

// export default function Sidebar({ role }) {
//   return (
//     <div className="w-64 bg-white border-r shadow-sm h-full p-4">
//       <h1 className="text-xl font-bold mb-6 text-blue-600">
//         Smart Event
//       </h1>

//       <nav className="space-y-3">

//         <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//           <FiHome /> Dashboard
//         </Link>

//         {(role === "admin" || role === "organizer") && (
//           <Link to="/events" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//             <FiCalendar /> Events
//           </Link>
//         )}

//         {role === "admin" && (
//           <Link to="/users" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
//             <FiUsers /> Users
//           </Link>
//         )}

//       </nav>
//     </div>
//   );
// }

import { Link, useLocation } from "react-router-dom"; 
import { FiHome, FiCalendar, FiUsers, FiMaximize } from "react-icons/fi"; 

export default function Sidebar({ role }) {
  const location = useLocation();
  const currentRole = role?.toLowerCase();

  const isLinkActive = (path) => location.pathname === path;

  return ( 
    <div className="w-64 bg-white border-r shadow-sm h-full p-4 flex flex-col justify-between"> 
      <div>
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">SE</div>
          <h1 className="text-lg font-bold text-gray-800">Smart Event</h1> 
        </div>

        <nav className="space-y-1.5"> 
          <Link 
            to="/" 
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              isLinkActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          > 
            <FiHome className="text-base" /> Dashboard 
          </Link> 

          {/* ✅ ALLOW ALL ROLES TO BROWSE EVENT LISTINGS */}
          <Link 
            to="/events" 
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              isLinkActive("/events") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          > 
            <FiCalendar className="text-base" /> Browse Events 
          </Link> 

          {/* ✅ TICKETS CAMERA SCANNER ACCESS FOR USERS */}
          <Link 
            to="/scanner" 
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              isLinkActive("/scanner") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          > 
            <FiMaximize className="text-base" /> Ticket Scanner 
          </Link> 

          {/* 🔒 HIGHLY RESTRICTED ADMINISTRATIVE USER VIEWS */}
          {currentRole === "admin" && ( 
            <Link 
              to="/users" 
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                isLinkActive("/users") ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            > 
              <FiUsers className="text-base" /> User Management 
            </Link> 
          )} 
        </nav> 
      </div>

      <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 text-center">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Access Node Level</p>
        <p className="text-xs font-semibold text-slate-700 capitalize mt-0.5">{currentRole || "Guest"}</p>
      </div>
    </div> 
  ); 
}
