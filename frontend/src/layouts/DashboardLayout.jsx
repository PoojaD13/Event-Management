// works fine 

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Outlet, Navigate } from "react-router-dom";
// // import Sidebar from "../components/layout/Sidebar";
// // import Navbar from "../components/layout/Navbar";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import { FiMenu } from "react-icons/fi";

// export default function DashboardLayout() {
//   const { user, token } = useSelector((state) => state.auth);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   // 🛡️ Explicit session check based on token string verification
//   const hasActiveSession = !!token || !!localStorage.getItem("token");
//   if (!hasActiveSession) {
//     return <Navigate to="/login" replace />;
//   }

//   // 🔄 FIX: Extracts properties whether your slice cached the raw response wrapper or flat profile object
//   const userProfile = user?.data?.user || user?.user || user;

//   // 🔄 Normalize role string metadata parameters safely to lowercase
//   const normalizedRole = userProfile?.role
//     ? String(userProfile.role).toLowerCase()
//     : "participant";

//   // 🔄 Fortify the runtime user fallback dataset model wrapper
//   const safeUser = {
//     name: userProfile?.name || "User Profile",
//     email: userProfile?.email || "syncing...",
//     role: normalizedRole,
//   };

//   //   return (
//   //     <div className="flex h-screen bg-gray-100 overflow-hidden relative">

//   //       {/* Mobile Sidebar Masking Backdrop Layer overlay */}
//   //       {mobileSidebarOpen && (
//   //         <div
//   //           onClick={() => setMobileSidebarOpen(false)}
//   //           className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
//   //         />
//   //       )}

//   //       {/* Persistent Desktop sidebar / Drawer slide animation container on mobile */}
//   //       <div className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:transform-none transition-transform duration-200 ease-in-out ${
//   //         mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//   //       }`}>
//   //         <Sidebar role={normalizedRole} />
//   //       </div>

//   //       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

//   //         {/* Mobile Navbar extension interface adapter ribbon strip bar */}
//   //         <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between shadow-xs">
//   //           <div className="flex items-center gap-2">
//   //             <button
//   //               onClick={() => setMobileSidebarOpen(true)}
//   //               className="p-2 text-xl text-slate-700 hover:bg-slate-50 rounded-xl border"
//   //             >
//   //               <FiMenu />
//   //             </button>
//   //             <span className="text-sm font-bold text-blue-600">Smart Event</span>
//   //           </div>
//   //           <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center uppercase">
//   //             {safeUser.name.charAt(0)}
//   //           </div>
//   //         </div>

//   //         {/* Desktop Main Header Component */}
//   //         <div className="hidden lg:block">
//   //           <Navbar user={safeUser} />
//   //         </div>

//   //         <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50">
//   //           {/* Renders nested active component child modules inside the layout slot tree view */}
//   //           <Outlet />
//   //         </main>
//   //       </div>
//   //     </div>
//   //   );

//   // Ensure your top-level JSX tag inside DashboardLayout looks like this:
//   return (
//     <div className="min-h-screen w-screen bg-gray-100 flex overflow-hidden font-sans antialiased text-slate-800">
//       <Sidebar role={normalizedRole} />

//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
//         <Navbar user={safeUser} />

//         {/* Dynamic mounting slot for children views */}
//         <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// testing with the announcement 

import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; 
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom"; // ✅ Added useNavigate 
import { io } from "socket.io-client";
// import Sidebar from "../layout/Sidebar"; 
// import Navbar from "../layout/Navbar"; 
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"
import { FiMenu, FiBell, FiX, FiAlertCircle } from "react-icons/fi";

export default function DashboardLayout() { 
  const { user, token } = useSelector((state) => state.auth); 
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Initialized navigate to handle badge link clicks

  // --- Real-Time Announcement State Engines ---
  const [announcements, setAnnouncements] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeAlert, setActiveAlert] = useState(null); // Controls floating banner view
  
  const location = useLocation();

  // 🛡️ Safety Guard: Enforce access barriers if token metrics drop
  const hasActiveSession = !!token || !!localStorage.getItem("token");
  if (!hasActiveSession) {
    return <Navigate to="/login" replace />;
  }

  const userProfile = user?.data?.user || user?.user || user;
  const normalizedRole = userProfile?.role ? String(userProfile.role).toLowerCase() : "participant";

  const safeUser = {
    name: userProfile?.name || "User Profile",
    email: userProfile?.email || "syncing...",
    role: normalizedRole
  };

  // 🔌 Connect Socket client globally to listen for live organizer broadcasts
  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
      auth: { token: token || localStorage.getItem("token") },
      transports: ["websocket"]
    });

    // ✅ FIXED: Listening for 'new-announcement' exactly as emitted by your backend handler
    socketInstance.on("new-announcement", (incomingAlert) => {
      console.log("📢 Real-time Announcement Captured from Backend:", incomingAlert);
      
      // ✅ FIXED MAP: Unpacks your backend's exact 'message' payload into your 'content' layout parameter
      const mappedAlert = {
        eventId: incomingAlert.eventId,
        title: incomingAlert.title,
        content: incomingAlert.message, // 👈 Maps 'message' to 'content' for layout compatibility
        createdAt: incomingAlert.createdAt || new Date().toISOString()
      };

      setAnnouncements((prev) => [mappedAlert, ...prev]);
      setUnreadCount((prev) => prev + 1);
      setActiveAlert(mappedAlert); // Triggers the animated toast dropdown notification banner
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  // Automatically reset badge values when a user navigates to check schedules
  useEffect(() => {
    if (location.pathname === "/") {
      setUnreadCount(0);
    }
  }, [location]);

  return ( 
    <div className="flex h-screen bg-gray-100 overflow-hidden relative font-sans antialiased text-slate-800"> 
      
      {/* 🚨 FLOATING REAL-TIME PUSH ANNOUNCEMENT TOAST BANNER */}
      {activeAlert && (
        <div className="fixed top-4 right-4 z-50 max-w-md w-full bg-slate-900 text-white shadow-2xl rounded-2xl border border-slate-800 p-4 animate-slideIn flex items-start gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl mt-0.5 text-lg shrink-0">
            <FiAlertCircle />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-amber-500 text-slate-950 font-black tracking-wider px-2 py-0.5 rounded-md uppercase">Live Alert</span>
              <p className="text-xs text-slate-400 font-mono">{new Date(activeAlert.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
            <h4 className="text-sm font-bold mt-1 text-white truncate">{activeAlert.title || "Organizer Announcement"}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed break-words">{activeAlert.content}</p>
          </div>
          <button 
            onClick={() => setActiveAlert(null)}
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800 shrink-0"
          >
            <FiX />
          </button>
        </div>
      )}

      {/* Mobile sidebar masking overlay */}
      {mobileSidebarOpen && (
        <div onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden" />
      )}

      {/* Navigation App Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:transform-none transition-transform duration-200 ease-in-out ${
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <Sidebar role={normalizedRole} /> 
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden"> 
        
        {/* Mobile Header Ribbon Custom View */}
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between shadow-xs z-30 sticky top-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-xl text-slate-700 hover:bg-slate-50 rounded-xl border"
            >
              <FiMenu />
            </button>
            <span className="text-sm font-bold text-blue-600 tracking-wide">Smart Event</span>
          </div>

          {/* Dynamic Floating Badge Icon Core implementation */}
          <div className="relative p-2 cursor-pointer text-slate-600 hover:text-slate-900 transition" onClick={() => navigate("/")}>
            <FiBell className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white animate-bounce">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Desktop Main Layout Header Navbar Workspace */}
        <div className="hidden lg:block relative">
          <Navbar user={safeUser} /> 
          {/* Inject Dynamic Notification Badge into Desktop View Corner layer */}
          <div className="absolute right-20 top-4 z-40 hidden sm:block">
            <div className="relative p-2 cursor-pointer text-slate-600 hover:text-blue-600 transition" title="Active live updates tracker panel" onClick={() => navigate("/")}>
              <FiBell className="text-xl" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Mounting Slot rendering core workspace page views layout inside the app tree */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50"> 
          <Outlet context={{ announcements }} /> 
        </main> 
      </div> 
    </div> 
  ); 
}
