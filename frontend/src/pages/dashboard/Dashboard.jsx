// // // work fine
// // import { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   FiUsers,
// //   FiCalendar,
// //   FiMessageSquare,
// //   FiActivity,
// // } from "react-icons/fi";
// // import api from "../../services/api"; // 📦 Your unified Axios client instance

// // export default function Dashboard() {
// //   const { user } = useSelector((state) => state.auth);
// //   const navigate = useNavigate();

// //   const [stats, setStats] = useState(null);
// //   const [recentEvents, setRecentEvents] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Safely normalize user properties
// //   const userProfile = user?.data?.user || user?.user || user;
// //   const currentUserRole = userProfile?.role
// //     ? String(userProfile.role).toLowerCase()
// //     : "participant";

// //   useEffect(() => {
// //     const fetchDashboardData = async () => {
// //       try {
// //         setLoading(true);

// //         // 1. Fetch live metrics from your new secured backend endpoint
// //         const res = await api.get("/dashboard");

// //         if (res?.success && res?.data) {
// //           // If your backend controller is fully configured, unpack its data structures directly
// //           setStats(res.data.stats);
// //           setRecentEvents(res.data.recentEvents || []);
// //         } else {
// //           // 🔄 FALLBACK AUTO-SYNC: If your separate dashboard controller is not deployed yet,
// //           // we fetch directly from the master event endpoint to display actual totals immediately
// //           // const eventRes = await api.get("/events");
// //           // const realEvents = eventRes?.events || eventRes?.data || [];

// //           const eventRes = await api.get("/events");

// //           const realEvents = eventRes?.data?.data?.events ?? [];

// //           // setStats({
// //           //   card1:
// //           //     currentUserRole === "admin"
// //           //       ? "120"
// //           //       : currentUserRole === "organizer"
// //           //         ? "8"
// //           //         : "5",
// //           //   card1Label:
// //           //     currentUserRole === "admin"
// //           //       ? "Total Users"
// //           //       : currentUserRole === "organizer"
// //           //         ? "My Events"
// //           //         : "Joined Events",
// //           //   card2: String(realEvents.length || "0"), // 👈 Dynamic, real count (e.g., "6") from your database
// //           //   card2Label: "Total Events",
// //           //   card3: currentUserRole === "admin" ? "18" : "12",
// //           //   card3Label:
// //           //     currentUserRole === "admin" ? "Active Chats" : "Announcements",
// //           //   card4: "92%",
// //           //   card4Label: "Engagement",
// //           // });

// //           setStats({
// //             card1:
// //               currentUserRole === "admin"
// //                 ? res?.data?.data?.totalUsers || 0
// //                 : currentUserRole === "organizer"
// //                   ? realEvents.length
// //                   : realEvents.length,

// //             card1Label:
// //               currentUserRole === "admin"
// //                 ? "Total Users"
// //                 : currentUserRole === "organizer"
// //                   ? "My Events"
// //                   : "Joined Events",

// //             card2: realEvents.length,
// //             card2Label: "Total Events",

// //             card3: realEvents.filter((e) => e.qrCode).length,
// //             card3Label:
// //               currentUserRole === "admin" ? "Active Events" : "Live Events",

// //             card4: `${Math.round(
// //               (realEvents.filter((e) => e.qrCode).length /
// //                 (realEvents.length || 1)) *
// //                 100,
// //             )}%`,
// //             card4Label: "Engagement",
// //           });

// //           // Pull the top 3 newest entries from your actual array layout
// //           setRecentEvents(
// //             realEvents.slice(0, 3).map((e) => ({
// //               _id: e._id,
// //               title: e.title,
// //               // status: e.qrCode ? "Live" : "Upcoming",
// //               status:
// //                 new Date(e.eventDate).toDateString() ===
// //                 new Date().toDateString()
// //                   ? "Live"
// //                   : "Upcoming",
// //             })),
// //           );
// //         }
// //       } catch (err) {
// //         console.error(
// //           "Dashboard database synchronization retrieval failed:",
// //           err,
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDashboardData();
// //   }, [currentUserRole]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-64 flex items-center justify-center">
// //         <p className="text-sm font-medium text-slate-400 animate-pulse">
// //           Syncing dynamic system analytics metrics...
// //         </p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* HEADER */}
// //       <div>
// //         <h1 className="text-3xl font-bold text-gray-800 uppercase">
// //           {currentUserRole} DASHBOARD
// //         </h1>
// //         <p className="text-gray-500 mt-1">
// //           Welcome back, {userProfile?.name || "User"}. Here’s what’s happening
// //           today.
// //         </p>
// //       </div>

// //       {/* STATS CARDS */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <Card
// //           title={stats?.card1Label}
// //           value={stats?.card1}
// //           icon={<FiUsers />}
// //           color="from-blue-500 to-blue-600"
// //         />
// //         <Card
// //           title={stats?.card2Label}
// //           value={stats?.card2}
// //           icon={<FiCalendar />}
// //           color="from-green-500 to-green-600"
// //         />
// //         {currentUserRole !== "participant" && (
// //           <Card
// //             title={stats?.card3Label}
// //             value={stats?.card3}
// //             icon={<FiMessageSquare />}
// //             color="from-purple-500 to-purple-600"
// //           />
// //         )}
// //         <Card
// //           title={stats?.card4Label}
// //           value={stats?.card4}
// //           icon={<FiActivity />}
// //           color="from-orange-500 to-orange-600"
// //         />
// //       </div>

// //       {/* ACTIVITY SECTION */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div className="bg-white rounded-2xl shadow p-6">
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-lg font-semibold">Recent Events</h2>
// //             <button
// //               onClick={() => navigate("/events")}
// //               className="text-xs font-bold text-blue-600 hover:underline"
// //             >
// //               View Full Catalog →
// //             </button>
// //           </div>
// //           <div className="space-y-3">
// //             {recentEvents.length > 0 ? (
// //               recentEvents.map((evt) => (
// //                 <EventItem
// //                   key={evt._id}
// //                   title={evt.title}
// //                   status={evt.status}
// //                   onClick={() => navigate(`/events/${evt._id}`)}
// //                 />
// //               ))
// //             ) : (
// //               <p className="text-xs text-slate-400 text-center py-4">
// //                 No real events found mapping active records.
// //               </p>
// //             )}
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl shadow p-6">
// //           <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
// //           <ul className="space-y-3 text-sm text-gray-600">
// //             <li className="flex items-center gap-2">
// //               <span className="text-green-500">✔</span> New user registered
// //             </li>
// //             <li className="flex items-center gap-2">
// //               <span className="text-green-500">✔</span> Event database instance
// //               created
// //             </li>
// //             <li className="flex items-center gap-2">
// //               <span className="text-green-500">✔</span> QR code generated
// //               (attendance module open)
// //             </li>
// //             <li className="flex items-center gap-2">
// //               <span className="text-green-500">✔</span> Node cluster sync
// //               success
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function Card({ title, value, icon, color }) {
// //   return (
// //     <div
// //       className={`bg-linear-to-r ${color} text-white p-5 rounded-2xl shadow-lg`}
// //     >
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <p className="text-sm opacity-80">{title}</p>
// //           <h3 className="text-2xl font-bold">{value}</h3>
// //         </div>
// //         <div className="text-3xl opacity-80">{icon}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // function EventItem({ title, status, onClick }) {
// //   return (
// //     <div
// //       onClick={onClick}
// //       className="flex items-center justify-between p-3 bg-gray-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer transition duration-150 group"
// //     >
// //       <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
// //         {title}
// //       </span>
// //       <span
// //         className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
// //           status === "Live"
// //             ? "bg-green-100 text-green-600"
// //             : "bg-blue-100 text-blue-600"
// //         }`}
// //       >
// //         {status}
// //       </span>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   FiUsers,
//   FiCalendar,
//   FiMessageSquare,
//   FiActivity,
// } from "react-icons/fi";
// import api from "../../services/api";

// export default function Dashboard() {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const [stats, setStats] = useState(null);
//   const [recentEvents, setRecentEvents] = useState([]);
//   const [myEvents, setMyEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userProfile = user?.data?.user || user?.user || user;
//   const currentUserRole = userProfile?.role
//     ? String(userProfile.role).toLowerCase()
//     : "participant";

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);

//         // ---------------- DASHBOARD API ----------------
//         const res = await api.get("/dashboard");

//         if (res?.success && res?.data) {
//           setStats(res.data.stats);
//           setRecentEvents(res.data.recentEvents || []);
//         } else {
//           // ---------------- EVENTS FALLBACK ----------------
//           const eventRes = await api.get("/events");
//           const realEvents = eventRes?.data?.data?.events ?? [];

//           // ---------------- STATS ----------------
//           setStats({
//             card1:
//               currentUserRole === "admin"
//                 ? res?.data?.data?.totalUsers || 0
//                 : realEvents.length,

//             card1Label:
//               currentUserRole === "admin"
//                 ? "Total Users"
//                 : currentUserRole === "organizer"
//                   ? "My Events"
//                   : "Joined Events",

//             card2: realEvents.length,
//             card2Label: "Total Events",

//             card3: realEvents.filter((e) => e.qrCode).length,
//             card3Label:
//               currentUserRole === "admin" ? "Active Events" : "Live Events",

//             card4: `${Math.round(
//               (realEvents.filter((e) => e.qrCode).length /
//                 (realEvents.length || 1)) *
//                 100,
//             )}%`,
//             card4Label: "Engagement",
//           });

//           // ---------------- RECENT EVENTS ----------------
//           const today = new Date();

//           setRecentEvents(
//             realEvents.slice(0, 3).map((e) => ({
//               _id: e._id,
//               title: e.title,
//               status:
//                 new Date(e.date).toDateString() === today.toDateString()
//                   ? "Live"
//                   : new Date(e.date).toDateString() < today.toDateString()
//                     ? "Past"
//                     : "Upcoming",
//             })),
//           );

//           // setRecentEvents(
//           //   realEvents.slice(0, 3).map((e) => ({
//           //     _id: e._id,
//           //     title: e.title,
//           //     status:
//           //       new Date(e.date).toDateString() === new Date().toDateString()
//           //         ? "Live"
//           //         : "Upcoming",
//           //   })),
//           // );

//           // ---------------- MY EVENTS (IMPORTANT FIX) ----------------
//           if (currentUserRole === "admin" || currentUserRole === "organizer") {
//             const myRes = await api.get("/events/my");
//             // const myEventsData = myRes?.data?.data?.events ?? [];
//             const myEventsData =
//               myRes?.data?.data?.events || myRes?.data?.events || [];
//             setMyEvents(myEventsData);
//           }
//         }
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [currentUserRole]);

//   if (loading) {
//     return (
//       <div className="min-h-64 flex items-center justify-center">
//         <p className="text-sm font-medium text-slate-400 animate-pulse">
//           Loading dashboard...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800 uppercase">
//           {currentUserRole} DASHBOARD
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Welcome back, {userProfile?.name || "User"}.
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card
//           title={stats?.card1Label}
//           value={stats?.card1}
//           icon={<FiUsers />}
//         />
//         <Card
//           title={stats?.card2Label}
//           value={stats?.card2}
//           icon={<FiCalendar />}
//         />
//         {currentUserRole !== "participant" && (
//           <Card
//             title={stats?.card3Label}
//             value={stats?.card3}
//             icon={<FiMessageSquare />}
//           />
//         )}
//         <Card
//           title={stats?.card4Label}
//           value={stats?.card4}
//           icon={<FiActivity />}
//         />
//       </div>

//       {/* RECENT EVENTS */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <h2 className="text-lg font-semibold mb-4">Recent Events</h2>

//         <div className="space-y-3">
//           {recentEvents.length > 0 ? (
//             recentEvents.map((evt) => (
//               <EventItem
//                 key={evt._id}
//                 title={evt.title}
//                 status={evt.status}
//                 onClick={() => navigate(`/events/${evt._id}`)}
//               />
//             ))
//           ) : (
//             <p className="text-xs text-gray-400">No events found</p>
//           )}
//         </div>
//       </div>

//       {/* MY EVENTS (ONLY ORGANIZER/ADMIN) */}
//       {(currentUserRole === "admin" || currentUserRole === "organizer") && (
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">My Events</h2>

//           <div className="space-y-3">
//             {myEvents.length > 0 ? (
//               myEvents.map((evt) => (
//                 <div
//                   key={evt._id}
//                   className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
//                 >
//                   {/* LEFT SIDE */}
//                   <div>
//                     <p className="font-medium">{evt.title}</p>

//                     <p className="text-xs text-gray-500">
//                       {evt.date
//                         ? new Date(evt.date).toLocaleDateString("en-GB", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "numeric",
//                           })
//                         : "No date"}
//                     </p>
//                   </div>

//                   {/* RIGHT SIDE ACTIONS */}
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => navigate(`/events/edit/${evt._id}`)}
//                       className="text-blue-600 text-xs font-semibold hover:underline"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={async () => {
//                         try {
//                           const res = await api.delete(`/events/${evt._id}`);

//                           if (res?.success !== false) {
//                             setMyEvents((prev) =>
//                               prev.filter((e) => e._id !== evt._id),
//                             );
//                           } else {
//                             alert("Failed to delete event");
//                           }
//                         } catch (err) {
//                           console.error("Delete failed:", err);
//                           alert("Error deleting event");
//                         }
//                       }}
//                       className="text-red-600 text-xs font-semibold hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-xs text-gray-400">No events created yet</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------------- UI COMPONENTS ---------------- */

// function Card({ title, value, icon }) {
//   return (
//     <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-2xl shadow-lg">
//       <div className="flex justify-between">
//         <div>
//           <p className="text-sm opacity-80">{title}</p>
//           <h3 className="text-2xl font-bold">{value}</h3>
//         </div>
//         <div className="text-3xl opacity-80">{icon}</div>
//       </div>
//     </div>
//   );
// }

// function EventItem({ title, status, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="flex justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer"
//     >
//       <span>{title}</span>
//       <span
//         className={`text-xs px-2 py-1 rounded-full ${
//           status === "Live"
//             ? "bg-green-100 text-green-600"
//             : "bg-blue-100 text-blue-600"
//         }`}
//       >
//         {status}
//       </span>
//     </div>
//   );
// }


// // work fine
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   FiUsers,
//   FiCalendar,
//   FiMessageSquare,
//   FiActivity,
// } from "react-icons/fi";
// import api from "../../services/api"; // 📦 Your unified Axios client instance

// export default function Dashboard() {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const [stats, setStats] = useState(null);
//   const [recentEvents, setRecentEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Safely normalize user properties
//   const userProfile = user?.data?.user || user?.user || user;
//   const currentUserRole = userProfile?.role
//     ? String(userProfile.role).toLowerCase()
//     : "participant";

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);

//         // 1. Fetch live metrics from your new secured backend endpoint
//         const res = await api.get("/dashboard");

//         if (res?.success && res?.data) {
//           // If your backend controller is fully configured, unpack its data structures directly
//           setStats(res.data.stats);
//           setRecentEvents(res.data.recentEvents || []);
//         } else {
//           // 🔄 FALLBACK AUTO-SYNC: If your separate dashboard controller is not deployed yet,
//           // we fetch directly from the master event endpoint to display actual totals immediately
//           // const eventRes = await api.get("/events");
//           // const realEvents = eventRes?.events || eventRes?.data || [];

//           const eventRes = await api.get("/events");

//           const realEvents = eventRes?.data?.data?.events ?? [];

//           // setStats({
//           //   card1:
//           //     currentUserRole === "admin"
//           //       ? "120"
//           //       : currentUserRole === "organizer"
//           //         ? "8"
//           //         : "5",
//           //   card1Label:
//           //     currentUserRole === "admin"
//           //       ? "Total Users"
//           //       : currentUserRole === "organizer"
//           //         ? "My Events"
//           //         : "Joined Events",
//           //   card2: String(realEvents.length || "0"), // 👈 Dynamic, real count (e.g., "6") from your database
//           //   card2Label: "Total Events",
//           //   card3: currentUserRole === "admin" ? "18" : "12",
//           //   card3Label:
//           //     currentUserRole === "admin" ? "Active Chats" : "Announcements",
//           //   card4: "92%",
//           //   card4Label: "Engagement",
//           // });

//           setStats({
//             card1:
//               currentUserRole === "admin"
//                 ? res?.data?.data?.totalUsers || 0
//                 : currentUserRole === "organizer"
//                   ? realEvents.length
//                   : realEvents.length,

//             card1Label:
//               currentUserRole === "admin"
//                 ? "Total Users"
//                 : currentUserRole === "organizer"
//                   ? "My Events"
//                   : "Joined Events",

//             card2: realEvents.length,
//             card2Label: "Total Events",

//             card3: realEvents.filter((e) => e.qrCode).length,
//             card3Label:
//               currentUserRole === "admin" ? "Active Events" : "Live Events",

//             card4: `${Math.round(
//               (realEvents.filter((e) => e.qrCode).length /
//                 (realEvents.length || 1)) *
//                 100,
//             )}%`,
//             card4Label: "Engagement",
//           });

//           // Pull the top 3 newest entries from your actual array layout
//           setRecentEvents(
//             realEvents.slice(0, 3).map((e) => ({
//               _id: e._id,
//               title: e.title,
//               // status: e.qrCode ? "Live" : "Upcoming",
//               status:
//                 new Date(e.eventDate).toDateString() ===
//                 new Date().toDateString()
//                   ? "Live"
//                   : "Upcoming",
//             })),
//           );
//         }
//       } catch (err) {
//         console.error(
//           "Dashboard database synchronization retrieval failed:",
//           err,
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, [currentUserRole]);

//   if (loading) {
//     return (
//       <div className="min-h-64 flex items-center justify-center">
//         <p className="text-sm font-medium text-slate-400 animate-pulse">
//           Syncing dynamic system analytics metrics...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-800 uppercase">
//           {currentUserRole} DASHBOARD
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Welcome back, {userProfile?.name || "User"}. Here’s what’s happening
//           today.
//         </p>
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card
//           title={stats?.card1Label}
//           value={stats?.card1}
//           icon={<FiUsers />}
//           color="from-blue-500 to-blue-600"
//         />
//         <Card
//           title={stats?.card2Label}
//           value={stats?.card2}
//           icon={<FiCalendar />}
//           color="from-green-500 to-green-600"
//         />
//         {currentUserRole !== "participant" && (
//           <Card
//             title={stats?.card3Label}
//             value={stats?.card3}
//             icon={<FiMessageSquare />}
//             color="from-purple-500 to-purple-600"
//           />
//         )}
//         <Card
//           title={stats?.card4Label}
//           value={stats?.card4}
//           icon={<FiActivity />}
//           color="from-orange-500 to-orange-600"
//         />
//       </div>

//       {/* ACTIVITY SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold">Recent Events</h2>
//             <button
//               onClick={() => navigate("/events")}
//               className="text-xs font-bold text-blue-600 hover:underline"
//             >
//               View Full Catalog →
//             </button>
//           </div>
//           <div className="space-y-3">
//             {recentEvents.length > 0 ? (
//               recentEvents.map((evt) => (
//                 <EventItem
//                   key={evt._id}
//                   title={evt.title}
//                   status={evt.status}
//                   onClick={() => navigate(`/events/${evt._id}`)}
//                 />
//               ))
//             ) : (
//               <p className="text-xs text-slate-400 text-center py-4">
//                 No real events found mapping active records.
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
//           <ul className="space-y-3 text-sm text-gray-600">
//             <li className="flex items-center gap-2">
//               <span className="text-green-500">✔</span> New user registered
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="text-green-500">✔</span> Event database instance
//               created
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="text-green-500">✔</span> QR code generated
//               (attendance module open)
//             </li>
//             <li className="flex items-center gap-2">
//               <span className="text-green-500">✔</span> Node cluster sync
//               success
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Card({ title, value, icon, color }) {
//   return (
//     <div
//       className={`bg-linear-to-r ${color} text-white p-5 rounded-2xl shadow-lg`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm opacity-80">{title}</p>
//           <h3 className="text-2xl font-bold">{value}</h3>
//         </div>
//         <div className="text-3xl opacity-80">{icon}</div>
//       </div>
//     </div>
//   );
// }

// function EventItem({ title, status, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="flex items-center justify-between p-3 bg-gray-50 hover:bg-slate-100 border border-slate-100 rounded-xl cursor-pointer transition duration-150 group"
//     >
//       <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
//         {title}
//       </span>
//       <span
//         className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
//           status === "Live"
//             ? "bg-green-100 text-green-600"
//             : "bg-blue-100 text-blue-600"
//         }`}
//       >
//         {status}
//       </span>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiActivity,
} from "react-icons/fi";
import api from "../../services/api";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userProfile = user?.data?.user || user?.user || user;
  const currentUserRole = userProfile?.role
    ? String(userProfile.role).toLowerCase()
    : "participant";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ---------------- DASHBOARD API ----------------
        const res = await api.get("/dashboard");

        if (res?.success && res?.data) {
          setStats(res.data.stats);
          setRecentEvents(res.data.recentEvents || []);
        } else {
          // ---------------- EVENTS FALLBACK ----------------
          const eventRes = await api.get("/events");
          const realEvents = eventRes?.data?.data?.events ?? [];

          // ---------------- STATS ----------------
          setStats({
            card1:
              currentUserRole === "admin"
                ? res?.data?.data?.totalUsers || 0
                : realEvents.length,

            card1Label:
              currentUserRole === "admin"
                ? "Total Users"
                : currentUserRole === "organizer"
                  ? "My Events"
                  : "Joined Events",

            card2: realEvents.length,
            card2Label: "Total Events",

            card3: realEvents.filter((e) => e.qrCode).length,
            card3Label:
              currentUserRole === "admin" ? "Active Events" : "Live Events",

            card4: `${Math.round(
              (realEvents.filter((e) => e.qrCode).length /
                (realEvents.length || 1)) *
                100,
            )}%`,
            card4Label: "Engagement",
          });

          // ---------------- RECENT EVENTS ----------------
          const today = new Date();

          setRecentEvents(
            realEvents.slice(0, 3).map((e) => ({
              _id: e._id,
              title: e.title,
              status:
                new Date(e.date).toDateString() === today.toDateString()
                  ? "Live"
                  : new Date(e.date).toDateString() < today.toDateString()
                    ? "Past"
                    : "Upcoming",
            })),
          );

          // setRecentEvents(
          //   realEvents.slice(0, 3).map((e) => ({
          //     _id: e._id,
          //     title: e.title,
          //     status:
          //       new Date(e.date).toDateString() === new Date().toDateString()
          //         ? "Live"
          //         : "Upcoming",
          //   })),
          // );

          // ---------------- MY EVENTS (IMPORTANT FIX) ----------------
          if (currentUserRole === "admin" || currentUserRole === "organizer") {
            const myRes = await api.get("/events/organizer/my");
            // const myEventsData = myRes?.data?.data?.events ?? [];
            const myEventsData =
              myRes?.data?.data?.events || myRes?.data?.events || [];
            setMyEvents(myEventsData);
          }
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUserRole]);

  if (loading) {
    return (
      <div className="min-h-64 flex items-center justify-center">
        <p className="text-sm font-medium text-slate-400 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 uppercase">
          {currentUserRole} DASHBOARD
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back, {userProfile?.name || "User"}.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title={stats?.card1Label}
          value={stats?.card1}
          icon={<FiUsers />}
        />
        <Card
          title={stats?.card2Label}
          value={stats?.card2}
          icon={<FiCalendar />}
        />
        {currentUserRole !== "participant" && (
          <Card
            title={stats?.card3Label}
            value={stats?.card3}
            icon={<FiMessageSquare />}
          />
        )}
        <Card
          title={stats?.card4Label}
          value={stats?.card4}
          icon={<FiActivity />}
        />
      </div>

      {/* RECENT EVENTS */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Events</h2>

        <div className="space-y-3">
          {recentEvents.length > 0 ? (
            recentEvents.map((evt) => (
              <EventItem
                key={evt._id}
                title={evt.title}
                status={evt.status}
                onClick={() => navigate(`/events/${evt._id}`)}
              />
            ))
          ) : (
            <p className="text-xs text-gray-400">No events found</p>
          )}
        </div>
      </div>

      {/* MY EVENTS (ONLY ORGANIZER/ADMIN) */}
      {(currentUserRole === "admin" || currentUserRole === "organizer") && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">My Events</h2>

          <div className="space-y-3">
            {myEvents.length > 0 ? (
              myEvents.map((evt) => (
                <div
                  key={evt._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  {/* LEFT SIDE */}
                  <div>
                    <p className="font-medium">{evt.title}</p>

                    <p className="text-xs text-gray-500">
                      {evt.date
                        ? new Date(evt.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "No date"}
                    </p>
                  </div>

                  {/* RIGHT SIDE ACTIONS */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/events/edit/${evt._id}`)}
                      className="text-blue-600 text-xs font-semibold hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        try {
                          const res = await api.delete(`/events/${evt._id}`);

                          if (res?.success !== false) {
                            setMyEvents((prev) =>
                              prev.filter((e) => e._id !== evt._id),
                            );
                          } else {
                            alert("Failed to delete event");
                          }
                        } catch (err) {
                          console.error("Delete failed:", err);
                          alert("Error deleting event");
                        }
                      }}
                      className="text-red-600 text-xs font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">No events created yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Card({ title, value, icon }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-2xl shadow-lg">
      <div className="flex justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}

function EventItem({ title, status, onClick }) {
  return (
    <div
      onClick={onClick}

      className="flex justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer"
    >
      <span>{title}</span>
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          status === "Live"
            ? "bg-green-100 text-green-600"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
} 