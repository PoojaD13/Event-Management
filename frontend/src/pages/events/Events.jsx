// // // import { useEffect, useState } from "react";
// // // import { getEvents } from "../../services/event.api";
// // // import { Link } from "react-router-dom";

// // // export default function Events() {
// // //   const [events, setEvents] = useState([]);

// // //   useEffect(() => {
// // //     fetchEvents();
// // //   }, []);

// // //   //   const fetchEvents = async () => {
// // //   //     const res = await getEvents();
// // //   //     console.log("EVENTS:", res?.data?.data?.events);

// // //   //     setEvents(res?.data?.data?.events || []);
// // //   //   };
// // //   const fetchEvents = async () => {
// // //     try {
// // //       const res = await getEvents();

// // //       const events = res?.data?.events;

// // //       setEvents(Array.isArray(events) ? events : []);
// // //     } catch (err) {
// // //       console.error("Failed to fetch events:", err);
// // //       setEvents([]);
// // //     }
// // //   };

// // //   return (
// // //     // <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-800">
// // //     <div>
// // //       <h2>Events</h2>

// // //       {events.map((event) => (
// // //         <div key={event._id}>
// // //           <h3>{event.title}</h3>

// // //           <Link to={`/events/${event._id}`}>View Details</Link>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import { getEvents } from "../../services/event.api";
// // import { Link } from "react-router-dom";

// // export default function Events() {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   const fetchEvents = async () => {
// //     try {
// //       const res = await getEvents();

// //       // ✅ Correct extraction path
// //       const events = res?.data?.events || [];

// //       console.log("Fetched Events:", events);

// //       setEvents(events);
// //     } catch (err) {
// //       console.error("Failed to fetch events:", err);
// //       setEvents([]);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen p-6 bg-slate-50">
// //       <h2 className="text-2xl font-bold mb-4">Events</h2>

// //       {events.length === 0 ? (
// //         <p>No events found</p>
// //       ) : (
// //         events.map((event) => (
// //           <div key={event._id} className="bg-white p-4 mb-3 rounded shadow">
// //             <h3 className="font-semibold">{event.title}</h3>
// //             <p className="text-gray-600">{event.description}</p>
// //             <p className="text-sm mt-1">
// //               📍 {event.building} - Floor {event.floor} - Room {event.roomNumber}
// //             </p>
// //             <Link
// //               to={`/events/${event._id}`}
// //               className="text-blue-600 mt-2 inline-block"
// //             >
// //               View Details
// //             </Link>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api"; // 📦 Core Axios client instance
// import { FiSearch, FiCalendar, FiMapPin, FiPlus, FiArrowRight } from "react-icons/fi";

// export default function Events() {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   // Component Data State Engines
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Filtering & Pagination State Engines
//   const [search, setSearch] = useState("");
//   const [buildingFilter, setBuildingFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const eventsPerPage = 6;

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         // Fallback target string routes can point directly to standard listings
//         const res = await api.get("/events");

//         // Handle varying payload structural variations safely
//         const records = res?.data || res?.events || res || [];
//         setEvents(Array.isArray(records) ? records : []);
//       } catch (err) {
//         console.error("Failed to compile event record sets:", err);
//         setError(err.message || "Could not retrieve synchronized event streams.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // Compute building classification bounds for dynamic selector filter dropdown chips
//   const uniqueBuildings = ["All", ...new Set(events.map(evt => evt.building).filter(Boolean))];

//   // Apply real-time client side string filtering pipelines
//   const filteredEvents = events.filter((evt) => {
//     const matchesSearch =
//       evt.title?.toLowerCase().includes(search.toLowerCase()) ||
//       evt.description?.toLowerCase().includes(search.toLowerCase());
//     const matchesBuilding = buildingFilter === "All" || evt.building === buildingFilter;
//     return matchesSearch && matchesBuilding;
//   });

//   // Calculate slice pagination offsets
//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
//   const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="text-sm font-medium text-slate-500 tracking-wide animate-pulse">Syncing conference timeline catalogs...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-8">
//       {/* HEADER SECTION PANEL CONTAINER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Conference & Event Catalog</h1>
//           <p className="text-sm text-slate-500 mt-1">Discover, scan, and track live schedules inside corporate venues.</p>
//         </div>

//         {/* Dynamic Action Trigger Component rendering based on user role permissions */}
//         {(user?.role === "admin" || user?.role === "organizer") && (
//           <button
//             onClick={() => navigate("/events/create")}
//             className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md shadow-blue-600/10 transition active:scale-[0.98] w-full md:w-auto text-sm"
//           >
//             <FiPlus className="text-lg" /> Create New Event
//           </button>
//         )}
//       </div>

//       {/* FILTER SEARCH AND DROP DOWN INTERFACE BAR */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="md:col-span-2 relative">
//           <FiSearch className="absolute left-4 top-3.5 text-slate-400 text-lg" />
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
//             placeholder="Search events by title keyword or descriptions..."
//             className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-slate-800 placeholder-slate-400"
//           />
//         </div>

//         <div className="relative">
//           <select
//             value={buildingFilter}
//             onChange={(e) => { setBuildingFilter(e.target.value); setCurrentPage(1); }}
//             className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 cursor-pointer"
//           >
//             {uniqueBuildings.map((building) => (
//               <option key={building} value={building}>📍 {building === "All" ? "All Locations" : building}</option>
//             ))}
//           </select>
//           <div className="absolute right-4 top-4 pointer-events-none text-xs text-slate-400">▼</div>
//         </div>
//       </div>

//       {/* COMPILER ERROR PRESENTATION FEEDBACK BANNER */}
//       {error && (
//         <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm text-center font-medium mb-6">
//           ⚠️ {error}
//         </div>
//       )}

//       {/* GRID MATRIX EVENT DATA INTERFACE LISTING DISPLAY */}
//       {currentEvents.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentEvents.map((evt) => (
//             <div
//               key={evt._id}
//               onClick={() => navigate(`/events/${evt._id}`)}
//               className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-slate-200/60 cursor-pointer transition-all duration-300 flex flex-col justify-between group h-full relative"
//             >
//               <div>
//                 {/* Visual anchor tag identifier for status blocks */}
//                 <span className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
//                   Active Room
//                 </span>

//                 <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 pr-16">
//                   {evt.title || "Untitled Conference"}
//                 </h3>
//                 <p className="text-xs text-slate-400 mt-0.5 font-medium">Organizer ID: {String(evt.organizer?._id || evt.organizer || "N/A")}</p>

//                 <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
//                   {evt.description || "No descriptions compiled for this event template block record details."}
//                 </p>
//               </div>

//               <div className="mt-6 pt-4 border-t border-slate-50 space-y-2 text-xs text-slate-500 font-medium">
//                 <div className="flex items-center gap-2">
//                   <FiCalendar className="text-blue-500 text-sm shrink-0" />
//                   <span>{evt.date ? new Date(evt.date).toLocaleDateString() : "TBD"} | {evt.startTime || "00:00"} - {evt.endTime || "00:00"}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FiMapPin className="text-emerald-500 text-sm shrink-0" />
//                   <span className="truncate">Bldg: {evt.building || "N/A"} | Floor: {evt.floor || "0"} | Room: {evt.roomNumber || "N/A"}</span>
//                 </div>

//                 <div className="flex items-center justify-end text-blue-600 font-semibold gap-1 text-[11px] uppercase tracking-wider pt-2 group-hover:translate-x-1 transition-transform">
//                   Examine Event <FiArrowRight />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center max-w-md mx-auto mt-12">
//           <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400 text-xl mb-3">🔍</div>
//           <h3 className="text-sm font-bold text-slate-800">No matching conferences found</h3>
//           <p className="text-xs text-slate-400 mt-1">Try refining your search keyword configurations or clean the destination selector filters.</p>
//         </div>
//       )}

//       {/* PAGINATION INTERACTIVE NAV BAR MODULE LAYOUT */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-2 mt-12">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(prev => prev - 1)}
//             className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
//           >
//             Previous
//           </button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`w-9 h-9 rounded-lg text-xs font-bold transition ${
//                 currentPage === i + 1
//                   ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
//                   : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(prev => prev + 1)}
//             className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// works fine but small bug

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import toast from "react-hot-toast";
// import { FiSearch, FiCalendar, FiMapPin, FiPlus, FiArrowRight, FiEdit2, FiTrash2 } from "react-icons/fi";

// export default function Events() {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [buildingFilter, setBuildingFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const eventsPerPage = 6;

//   // Safe user credential parsing blocks
//   const userProfile = user?.data?.user || user?.user || user;
//   const currentUserId = userProfile?._id || userProfile?.id;
//   const currentUserRole = userProfile?.role ? String(userProfile.role).toLowerCase() : "";

//   const fetchEvents = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await api.get("/events");
//       console.log("📥 Raw Frontend API Catch:", res);

//       // ✅ FIX: Extract the exact 'events' array block returned by your Mongoose query
//       const records = res?.events || res?.data?.events || res?.data || res || [];
//       setEvents(Array.isArray(records) ? records : []);
//     } catch (err) {
//       setError(err.message || "Could not retrieve synchronized event streams.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleDelete = async (e, eventId) => {
//     e.stopPropagation();
//     if (!window.confirm("Are you sure you want to permanently delete this event?")) return;

//     try {
//       await api.delete(`/events/${eventId}`);
//       toast.success("Event deleted successfully");
//       fetchEvents();
//     } catch (err) {
//       toast.error(err.message || "Failed to delete the event.");
//     }
//   };

//   const uniqueBuildings = ["All", ...new Set(events.map(evt => evt.building).filter(Boolean))];

//   const filteredEvents = events.filter((evt) => {
//     const matchesSearch =
//       evt.title?.toLowerCase().includes(search.toLowerCase()) ||
//       evt.description?.toLowerCase().includes(search.toLowerCase());
//     const matchesBuilding = buildingFilter === "All" || evt.building === buildingFilter;
//     return matchesSearch && matchesBuilding;
//   });

//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
//   const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="text-sm font-medium text-slate-500 tracking-wide animate-pulse">Syncing timeline data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-8">
//       {/* HEADER ROW BAR */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Conference Catalog</h1>
//           <p className="text-sm text-slate-500 mt-1">Discover, adapt, and monitor schedules across local rooms.</p>
//         </div>

//         {(currentUserRole === "admin" || currentUserRole === "organizer") && (
//           <button
//             onClick={() => navigate("/events/create")}
//             className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition active:scale-[0.98] text-sm"
//           >
//             <FiPlus className="text-lg" /> Create New Event
//           </button>
//         )}
//       </div>

//       {/* FILTERS TOOLBAR */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <div className="md:col-span-2 relative">
//           <FiSearch className="absolute left-4 top-3.5 text-slate-400 text-lg" />
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
//             placeholder="Search events by title keyword..."
//             className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
//           />
//         </div>

//         <div className="relative">
//           <select
//             value={buildingFilter}
//             onChange={(e) => { setBuildingFilter(e.target.value); setCurrentPage(1); }}
//             className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none text-slate-700 cursor-pointer appearance-none"
//           >
//             {uniqueBuildings.map((b) => (
//               <option key={b} value={b}>📍 {b === "All" ? "All Locations" : b}</option>
//             ))}
//           </select>
//           <div className="absolute right-4 top-4 pointer-events-none text-xs text-slate-400">▼</div>
//         </div>
//       </div>

//       {error && <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm text-center mb-6">⚠️ {error}</div>}

//       {/* REAL MATRIX CATALOG GRID OVERLAY */}
//       {currentEvents.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentEvents.map((evt) => {
//             const eventOrganizerId = String(evt.organizer?._id || evt.organizer || "");
//             const isOwner = currentUserRole === "admin" || (currentUserRole === "organizer" && eventOrganizerId === String(currentUserId));

//             return (
//               <div
//                 key={evt._id}
//                 onClick={() => navigate(`/events/${evt._id}`)}
//                 className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-slate-200/60 cursor-pointer transition-all duration-300 flex flex-col justify-between group h-full relative"
//               >
//                 <div>
//                   <div className="flex items-start justify-between gap-2 mb-2">
//                     <span className="bg-blue-50 text-blue-600 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full">
//                       Active
//                     </span>

//                     {isOwner && (
//                       <div className="flex items-center gap-1.5 z-20">
//                         <button
//                           onClick={(e) => { e.stopPropagation(); navigate(`/events/edit/${evt._id}`); }}
//                           className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition text-xs"
//                           title="Edit Attributes"
//                         >
//                           <FiEdit2 />
//                         </button>
//                         <button
//                           onClick={(e) => handleDelete(e, evt._id)}
//                           className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition text-xs"
//                           title="Delete Permanently"
//                         >
//                           <FiTrash2 />
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
//                     {evt.title || "Untitled Conference"}
//                   </h3>
//                   <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">{evt.description}</p>
//                 </div>

//                 <div className="mt-6 pt-4 border-t border-slate-50 space-y-2 text-xs text-slate-500 font-medium">
//                   <div className="flex items-center gap-2">
//                     <FiCalendar className="text-blue-500 text-sm shrink-0" />
//                     <span>{evt.date ? new Date(evt.date).toLocaleDateString() : "TBD"} | {evt.startTime} - {evt.endTime}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FiMapPin className="text-emerald-500 text-sm shrink-0" />
//                     <span className="truncate">Bldg: {evt.building} | Room: {evt.roomNumber}</span>
//                   </div>

//                   <div className="flex items-center justify-end text-blue-600 font-semibold gap-1 text-[11px] uppercase tracking-wider pt-2 group-hover:translate-x-1 transition-transform">
//                     Examine Event <FiArrowRight />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="text-center text-slate-400 py-12">No event records found matching parameters.</div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiPlus,
  FiArrowRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export default function Events() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Safe user credential parsing blocks
  const userProfile = user?.data?.user || user?.user || user;
  const currentUserId = userProfile?._id || userProfile?.id;
  const currentUserRole = userProfile?.role
    ? String(userProfile.role).toLowerCase()
    : "";

  // const fetchEvents = async () => {
  //   try {
  //     setLoading(true);
  //     setError("");
  //     const res = await api.get("/events");
  //     console.log("📥 Raw Frontend API Catch:", res);

  //     // Extract array payload regardless of structural wrappers
  //     const records = res?.events || res?.data?.events || res?.data || res || [];
  //     setEvents(Array.isArray(records) ? records : []);
  //   } catch (err) {
  //     setError(err.message || "Could not retrieve synchronized event streams.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 🛠️ Replace this function inside src/pages/events/Events.jsx
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/events");

      const records = res?.data?.data?.events || [];

      setEvents(records);
    } catch (err) {
      console.error("Catch block triggered:", err);
      setError(err.message || "Could not retrieve synchronized event streams.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (e, eventId) => {
    e.stopPropagation();
    if (
      !window.confirm("Are you sure you want to permanently delete this event?")
    )
      return;

    try {
      await api.delete(`/events/${eventId}`);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      toast.error(err.message || "Failed to delete the event.");
    }
  };

  const uniqueBuildings = [
    "All",
    ...new Set(events.map((evt) => evt.building).filter(Boolean)),
  ];

  // ✅ SAFELY PARSE ISO DATE OBJECT STRINGS DURING RUNTIME FILTER EVALUATIONS
  const filteredEvents = events.filter((evt) => {
    const titleMatch = evt.title?.toLowerCase().includes(search.toLowerCase());
    const descMatch = evt.description
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesSearch = titleMatch || descMatch;

    const matchesBuilding =
      buildingFilter === "All" || evt.building === buildingFilter;
    return matchesSearch && matchesBuilding;
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium text-slate-500 tracking-wide animate-pulse">
          Syncing timeline data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* HEADER ROW BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Conference Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover, adapt, and monitor schedules across local rooms.
          </p>
        </div>

        {(currentUserRole === "admin" || currentUserRole === "organizer") && (
          <button
            onClick={() => navigate("/events/create")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition active:scale-[0.98] text-sm"
          >
            <FiPlus className="text-lg" /> Create New Event
          </button>
        )}
      </div>

      {/* FILTERS TOOLBAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2 relative">
          <FiSearch className="absolute left-4 top-3.5 text-slate-400 text-lg" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search events by title keyword..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
          />
        </div>

        <div className="relative">
          <select
            value={buildingFilter}
            onChange={(e) => {
              setBuildingFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none text-slate-700 cursor-pointer appearance-none"
          >
            {uniqueBuildings.map((b) => (
              <option key={b} value={b}>
                📍 {b === "All" ? "All Locations" : b}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-4 pointer-events-none text-xs text-slate-400">
            ▼
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm text-center mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* REAL MATRIX CATALOG GRID OVERLAY */}
      {currentEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((evt) => {
            const eventOrganizerId = String(
              evt.organizer?._id || evt.organizer || "",
            );
            const isOwner =
              currentUserRole === "admin" ||
              (currentUserRole === "organizer" &&
                eventOrganizerId === String(currentUserId));

            // Determine if event is an upcoming type layout based on present hour clocks
            const isUpcoming = new Date(evt.date) > new Date();

            return (
              <div
                key={evt._id}
                onClick={() => navigate(`/events/${evt._id}`)}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:border-slate-200/60 cursor-pointer transition-all duration-300 flex flex-col justify-between group h-full relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${
                        isUpcoming
                          ? "bg-amber-50 text-amber-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {isUpcoming ? "Upcoming" : "Live / Past"}
                    </span>
                    {isOwner && (
                      <div className="flex items-center gap-1.5 z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/events/edit/${evt._id}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition text-xs"
                          title="Edit Attributes"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, evt._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition text-xs"
                          title="Delete Permanently"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {evt.title || "Untitled Conference"}
                  </h3>
                  <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 space-y-2 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-blue-500 text-sm shrink-0" />
                    <span>
                      {evt.date
                        ? new Date(evt.date).toLocaleDateString()
                        : "TBD"}{" "}
                      | {evt.startTime} - {evt.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-emerald-500 text-sm shrink-0" />
                    <span className="truncate">
                      Bldg: {evt.building} | Room: {evt.roomNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-end text-blue-600 font-semibold gap-1 text-[11px] uppercase tracking-wider pt-2 group-hover:translate-x-1 transition-transform">
                    Examine Event <FiArrowRight />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-slate-400 py-12">
          No event records found matching parameters.
        </div>
      )}

      {/* ✅ ADDED: INTERACTIVE PAGINATION CONTROLS FOOTER STRIP */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 select-none">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3.5 py-2 rounded-xl border bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white border text-slate-600 hover:bg-slate-50"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3.5 py-2 rounded-xl border bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
