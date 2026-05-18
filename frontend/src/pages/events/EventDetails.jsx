// // // //works fine

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import { getEventById } from "../../services/event.api";

// // // export default function EventDetails() {
// // //   const { id } = useParams();
// // //   const [event, setEvent] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     if (!id) return;
// // //     const load = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await getEventById(id);
// // //         if (res?.success && res?.data) {
// // //           setEvent(res.data);
// // //         }
// // //       } catch (err) {
// // //         console.error("Error fetching event details:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     load();
// // //   }, [id]);

// // //   const handleDownload = () => {
// // //     if (!event?.qrCode) return;
// // //     const downloadLink = document.createElement("a");
// // //     downloadLink.href = event.qrCode;
// // //     downloadLink.download = `QR-${event.title?.replace(/\s+/g, "-") || "Ticket"}.png`;
// // //     document.body.appendChild(downloadLink);
// // //     downloadLink.click();
// // //     document.body.removeChild(downloadLink);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-slate-100">
// // //         <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
// // //       </div>
// // //     );
// // //   }

// // //   if (!event) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-slate-100">
// // //         <h2 className="text-xl font-semibold text-red-500">Event not found</h2>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-slate-100 p-6 flex flex-col items-center justify-center">
// // //       <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
// // //         <span className="text-xs text-slate-400 block mb-1 font-mono">ID: {String(event._id)}</span>
// // //         <h2 className="text-2xl font-bold text-gray-800">{String(event.title || "Untitled Event")}</h2>
// // //         <p className="text-gray-600 mt-2">{String(event.description || "No description provided")}</p>

// // //         <div className="mt-4 text-sm text-gray-700 space-y-1 border-l-2 border-slate-200 pl-3">
// // //           <p>📍 Building: {String(event.building || "N/A")}</p>
// // //           <p>🏢 Floor: {String(event.floor || "N/A")}</p>
// // //           <p>🚪 Room: {String(event.roomNumber || "N/A")}</p>
// // //           {event.date && <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>}
// // //           <p>⏰ Time: {String(event.startTime || "")} - {String(event.endTime || "")}</p>
// // //         </div>

// // //         <div className="mt-6 flex flex-col items-center justify-center">
// // //           {event.qrCode ? (
// // //             <div className="space-y-4 w-full flex flex-col items-center">
// // //               <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 shadow-xs">
// // //                 <img src={event.qrCode} alt="Event QR" className="w-44 h-44 object-contain rounded-lg bg-white" />
// // //               </div>
// // //               <button
// // //                 onClick={handleDownload}
// // //                 className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
// // //               >
// // //                 📥 Download Ticket QR
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <p className="text-xs text-slate-500 font-mono">No QR code available</p>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // working fine with the chat implementation but a bug refreshing
// // // import { useEffect, useState, useRef } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { useSelector } from "react-redux";
// // // import { io } from "socket.io-client";
// // // import { getEventById } from "../../services/event.api";
// // // import api from "../../services/api";
// // // import { FiSend, FiMessageSquare, FiArrowLeft } from "react-icons/fi";
// // // import toast from "react-hot-toast";

// // // export default function EventDetails() {
// // //   const { id: eventId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [event, setEvent] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   // --- Real-Time Chat System State Engines ---
// // //   const { user, token } = useSelector((state) => state.auth);
// // //   const userProfile = user?.data?.user || user?.user || user;
// // //   const currentUserId = userProfile?._id || userProfile?.id;

// // //   const [messages, setMessages] = useState([]);
// // //   const [newMessage, setNewMessage] = useState("");
// // //   const [socket, setSocket] = useState(null);
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => {
// // //     if (!eventId) return;
// // //     const load = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await getEventById(eventId);
// // //         if (res?.success && res?.data) setEvent(res.data);
// // //       } catch (err) {
// // //         console.error("Error fetching event details:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     load();
// // //   }, [eventId]);

// // //   // --- Real-Time Chat Sync Loop with Backend ---
// // //   useEffect(() => {
// // //     if (!eventId) return;

// // //     // // Fetch historical log streams securely from the database cache channel
// // //     // const fetchChatHistory = async () => {
// // //     //   try {
// // //     //     const res = await api.get(`/events/chat/${eventId}`);
// // //     //     console.log("📜 Chat History Logs Flattened Payload:", res);

// // //     //     // Dynamic array extraction unwrapper tool
// // //     //     const historyLogs = res?.data || res?.messages || res || [];
// // //     //     if (Array.isArray(historyLogs)) setMessages(historyLogs);
// // //     //   } catch (err) {
// // //     //     console.warn("Could not load historical communication trace logs:", err);
// // //     //   }
// // //     // };
// // //     // fetchChatHistory();

// // //     // 🛠️ Locate and replace the fetchChatHistory block inside src/pages/events/EventDetails.jsx:

// // //     const fetchChatHistory = async () => {
// // //       try {
// // //         // 1. Make the secure history fetch request to your chat history path endpoint
// // //         const res = await api.get(`/events/chat/${eventId}`);
// // //         console.log("📜 Chat History Endpoint Network Response Payload:", res);

// // //         // 2. ✅ DRILL DOWN FIX: Safely extract array elements out of your backend's custom JSON wrapper
// // //         let historicalArray = [];

// // //         if (res?.data && Array.isArray(res.data)) {
// // //           historicalArray = res.data; // 👈 Targets your backend's exact 'data: messages' object envelope array block
// // //         } else if (Array.isArray(res?.messages)) {
// // //           historicalArray = res.messages;
// // //         } else if (Array.isArray(res)) {
// // //           historicalArray = res;
// // //         }

// // //         console.log(
// // //           "🎯 Unpacked Chat Archive Records for Rendering on Mount:",
// // //           historicalArray,
// // //         );

// // //         // 3. Populate your component state array with the database records
// // //         setMessages(historicalArray);
// // //       } catch (err) {
// // //         console.warn(
// // //           "Could not load historical communication trace logs from MongoDB:",
// // //           err,
// // //         );
// // //       }
// // //     };

// // //     fetchChatHistory();

// // //     // Establish link connection with Socket server port cluster
// // //     const socketInstance = io(
// // //       import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",
// // //       {
// // //         auth: { token: token || localStorage.getItem("token") },
// // //         transports: ["websocket"],
// // //       },
// // //     );
// // //     setSocket(socketInstance);

// // //     // Command socket hub to assign channel parameters to specific isolated event room
// // //     socketInstance.emit("join_event_room", { eventId });

// // //     // ✅ FIXED LISTENER: Listens precisely to the 'receive_message' string broadcasted downstream
// // //     socketInstance.on("receive_message", (incomingMsg) => {
// // //       console.log(
// // //         "📨 Real-time message packet caught via socket:",
// // //         incomingMsg,
// // //       );

// // //       const senderId = incomingMsg?.sender?._id || incomingMsg?.sender;
// // //       if (String(senderId) !== String(currentUserId)) {
// // //         setMessages((prev) => [...prev, incomingMsg]);
// // //       }
// // //     });

// // //     return () => {
// // //       socketInstance.emit("leave_event_room", { eventId });
// // //       socketInstance.disconnect();
// // //     };
// // //   }, [eventId, token, currentUserId]);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages]);

// // //   const handleMessageSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (!newMessage.trim() || !socket) return;

// // //     const messagePayload = {
// // //       eventId,
// // //       text: newMessage, // Passed for real-time socket broadcasting layers
// // //       message: newMessage, // Passed to prevent payload key assignment rejections on schema rules
// // //       sender: {
// // //         _id: currentUserId,
// // //         name: userProfile?.name || "Anonymous User",
// // //         role: userProfile?.role || "participant",
// // //       },
// // //       createdAt: new Date().toISOString(),
// // //     };

// // //     // Broadcast message downstream to all active participants in the conference room
// // //     socket.emit("send_message", messagePayload);

// // //     // Mount text element bubble block frame optimistically onto local array instantly
// // //     setMessages((prev) => [...prev, messagePayload]);
// // //     setNewMessage("");
// // //   };

// // //   const handleDownload = () => {
// // //     if (!event?.qrCode) return;
// // //     const downloadLink = document.createElement("a");
// // //     downloadLink.href = event.qrCode;
// // //     downloadLink.download = `QR-${event.title?.replace(/\s+/g, "-") || "Ticket"}.png`;
// // //     document.body.appendChild(downloadLink);
// // //     downloadLink.click();
// // //     document.body.removeChild(downloadLink);
// // //   };

// // //   if (loading)
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-slate-100">
// // //         <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
// // //       </div>
// // //     );
// // //   if (!event)
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-slate-100">
// // //         <h2 className="text-xl font-semibold text-red-500">Event not found</h2>
// // //       </div>
// // //     );

// // //   return (
// // //     <div className="min-h-screen bg-slate-100 p-4 md:p-6 flex flex-col items-center justify-center">
// // //       <button
// // //         onClick={() => navigate("/events")}
// // //         className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition mb-4 self-start max-w-6xl mx-auto w-full"
// // //       >
// // //         <FiArrowLeft /> Return to Catalog
// // //       </button>

// // //       <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
// // //         {/* LEFT PANEL: EVENT CARD */}
// // //         <div className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-between">
// // //           <div>
// // //             <span className="text-xs text-slate-400 block mb-1 font-mono">
// // //               ID: {String(event._id)}
// // //             </span>
// // //             <h2 className="text-2xl font-bold text-gray-800">
// // //               {String(event.title || "Untitled Event")}
// // //             </h2>
// // //             <p className="text-gray-600 mt-2">
// // //               {String(event.description || "No description provided")}
// // //             </p>

// // //             <div className="mt-4 text-sm text-gray-700 space-y-1 border-l-2 border-slate-200 pl-3">
// // //               <p>📍 Building: {String(event.building || "N/A")}</p>
// // //               <p>🏢 Floor: {String(event.floor || "N/A")}</p>
// // //               <p>🚪 Room: {String(event.roomNumber || "N/A")}</p>
// // //               {event.date && (
// // //                 <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
// // //               )}
// // //               <p>
// // //                 ⏰ Time: {String(event.startTime || "")} -{" "}
// // //                 {String(event.endTime || "")}
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="mt-6 flex flex-col items-center justify-center">
// // //             {event.qrCode ? (
// // //               <div className="space-y-4 w-full flex flex-col items-center">
// // //                 <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 shadow-xs">
// // //                   <img
// // //                     src={event.qrCode}
// // //                     alt="Event QR"
// // //                     className="w-44 h-44 object-contain rounded-lg bg-white"
// // //                   />
// // //                 </div>
// // //                 <button
// // //                   onClick={handleDownload}
// // //                   className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
// // //                 >
// // //                   📥 Download Ticket QR
// // //                 </button>
// // //               </div>
// // //             ) : (
// // //               <p className="text-xs text-slate-500 font-mono">
// // //                 No QR code available
// // //               </p>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* RIGHT PANEL: CHATROOM MODULE */}
// // //         <div className="lg:col-span-1 flex flex-col h-[550px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
// // //           <div className="bg-slate-900 px-5 py-4 text-white flex items-center gap-2 shrink-0 select-none">
// // //             <FiMessageSquare className="text-xl text-blue-400" />
// // //             <div>
// // //               <h3 className="text-sm font-bold tracking-tight">
// // //                 Live Event Chatroom
// // //               </h3>
// // //               <p className="text-[10px] text-slate-400">
// // //                 Exchanging logs on active channels.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
// // //             {messages.length > 0 ? (
// // //               messages.map((msg, index) => {
// // //                 const senderId = msg?.sender?._id || msg?.sender;
// // //                 const isMe = String(senderId) === String(currentUserId);

// // //                 // ✅ DYNAMIC READ FALLBACK: Maps both live text strings and saved DB message tokens safely
// // //                 const renderedText = msg.text || msg.message || "";

// // //                 return (
// // //                   <div
// // //                     key={index}
// // //                     className={`flex flex-col max-w-[85%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
// // //                   >
// // //                     {!isMe && (
// // //                       <span className="text-[9px] font-bold text-slate-400 mb-0.5 px-1 capitalize">
// // //                         {msg.sender?.name || "Participant"} •{" "}
// // //                         <span className="text-blue-500 font-medium text-[8px]">
// // //                           {msg.sender?.role || "user"}
// // //                         </span>
// // //                       </span>
// // //                     )}
// // //                     <div
// // //                       className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed break-all shadow-xs ${
// // //                         isMe
// // //                           ? "bg-blue-600 text-white rounded-br-none"
// // //                           : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
// // //                       }`}
// // //                     >
// // //                       {renderedText}
// // //                     </div>
// // //                     <span className="text-[8px] text-slate-400 mt-0.5 px-1 select-none">
// // //                       {msg.createdAt
// // //                         ? new Date(msg.createdAt).toLocaleTimeString([], {
// // //                             hour: "2-digit",
// // //                             minute: "2-digit",
// // //                           })
// // //                         : "now"}
// // //                     </span>
// // //                   </div>
// // //                 );
// // //               })
// // //             ) : (
// // //               <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6 select-none">
// // //                 <div className="text-2xl mb-1">💬</div>
// // //                 <p className="text-xs font-bold text-slate-500">
// // //                   Live communication trace empty
// // //                 </p>
// // //                 <p className="text-[10px] text-slate-400 mt-0.5">
// // //                   Submit responses to activate conversation logs.
// // //                 </p>
// // //               </div>
// // //             )}
// // //             <div ref={messagesEndRef} />
// // //           </div>

// // //           <form
// // //             onSubmit={handleMessageSubmit}
// // //             className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0"
// // //           >
// // //             <input
// // //               type="text"
// // //               value={newMessage}
// // //               onChange={(e) => setNewMessage(e.target.value)}
// // //               placeholder="Send live responses across devices..."
// // //               className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm"
// // //             />
// // //             <button
// // //               type="submit"
// // //               className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center"
// // //             >
// // //               <FiSend className="text-sm" />
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // working completely with the chat

// // import { useEffect, useState, useRef } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { io } from "socket.io-client";
// // import { getEventById } from "../../services/event.api";
// // import api from "../../services/api"; // 📦 Unified Axios instance
// // import { FiCalendar, FiMapPin, FiClock, FiSend, FiMessageSquare, FiArrowLeft } from "react-icons/fi";
// // import toast from "react-hot-toast";

// // export default function EventDetails() {
// //   const { id: eventId } = useParams();
// //   const navigate = useNavigate();
// //   const { user, token } = useSelector((state) => state.auth);

// //   // Safe extraction layer for user session criteria logs
// //   const userProfile = user?.data?.user || user?.user || user;
// //   const currentUserId = userProfile?._id || userProfile?.id;

// //   // Primary Component State Hooks
// //   const [event, setEvent] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Real-Time Socket Messaging State Hooks
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [socket, setSocket] = useState(null);
// //   const messagesEndRef = useRef(null);

// //   // 🔄 Lifecyle Hook 1: Core Initial Data Sync (Triggers on mount and refresh events)
// //   useEffect(() => {
// //     if (!eventId) return;

// //     // Action A: Fetch clean Event metadata records from MongoDB catalog collections
// //     const loadEventData = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await getEventById(eventId);
// //         if (res?.success && res?.data) {
// //           setEvent(res.data);
// //         }
// //       } catch (err) {
// //         console.error("Error reading event context parameters:", err);
// //         toast.error("Failed to compile targeted conference details.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     // Action B: ✅ CRITICAL REFRESH RECOVERY - Fetch historic chat logs from database instantly
// //     const fetchChatHistory = async () => {
// //       try {
// //         console.log("📡 Triggering Chat History API Call for event node:", eventId);
// //         const res = await api.get(`/chat/${eventId}`);
// //         console.log("📜 Raw Chat History HTTP Response Payload:", res);

// //         // Extract array elements safely out of your backend's custom json wrapper envelope
// //         const historicalArray = res?.data?.data || res?.messages || res || [];
// //         if (Array.isArray(historicalArray)) {
// //           setMessages(historicalArray);
// //         }
// //       } catch (err) {
// //         console.warn("Could not load historical communication trace logs from MongoDB:", err);
// //       }
// //     };

// //     // Initialize both actions simultaneously to guarantee state persistence on page reload
// //     loadEventData();
// //     fetchChatHistory();
// //   }, [eventId]);

// //   // 🔌 Lifecycle Hook 2: Standalone Active Real-Time Socket Gateway Pipeline Listener
// //   useEffect(() => {
// //     if (!eventId) return;

// //     // Connect securely to your running Express socket gateway port
// //     const socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
// //       auth: { token: token || localStorage.getItem("token") },
// //       transports: ["websocket"]
// //     });
// //     setSocket(socketInstance);

// //     // Command backend configuration pipelines to assign this connection to specific event room
// //     socketInstance.emit("join_event_room", { eventId });

// //     // Intercept incoming real-time messages broadcast down from other system client tabs
// //     socketInstance.on("receive_message", (incomingMsg) => {
// //       console.log("📥 Incoming real-time message packet caught via socket:", incomingMsg);

// //       // Safety validation check to prevent duplicating the local user's optimistic text render
// //       const senderId = incomingMsg.sender?._id || incomingMsg.sender || incomingMsg.senderId;
// //       if (String(senderId) !== String(currentUserId)) {
// //         setMessages((prev) => [...prev, incomingMsg]);
// //       }
// //     });

// //     return () => {
// //       socketInstance.emit("leave_event_room", { eventId });
// //       socketInstance.disconnect();
// //     };
// //   }, [eventId, token, currentUserId]);

// //   // Force scroll target baseline alignment upon changes inside message state tracking arrays
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   const handleMessageSubmit = (e) => {
// //     e.preventDefault();
// //     if (!newMessage.trim() || !socket) return;

// //     const messagePayload = {
// //       eventId,
// //       text: newMessage, // Handled by cross-browser rendering engines matching socket payload specs
// //       message: newMessage, // Handled to fulfill backend schema validation rules
// //       sender: {
// //         _id: currentUserId,
// //         name: userProfile?.name || "Anonymous User",
// //         role: userProfile?.role || "participant"
// //       },
// //       createdAt: new Date().toISOString()
// //     };

// //     // Emit live text string downstream into socket room
// //     socket.emit("send_message", messagePayload);

// //     // Add text element optimistically straight into local memory view layout instantly
// //     setMessages((prev) => [...prev, messagePayload]);
// //     setNewMessage("");
// //   };

// //   const handleDownload = () => {
// //     if (!event?.qrCode) return;
// //     const downloadLink = document.createElement("a");
// //     downloadLink.href = event.qrCode;
// //     downloadLink.download = `QR-${event.title?.replace(/\s+/g, "-") || "Ticket"}.png`;
// //     document.body.appendChild(downloadLink);
// //     downloadLink.click();
// //     document.body.removeChild(downloadLink);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-100">
// //         <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   if (!event) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-100">
// //         <h2 className="text-xl font-semibold text-red-500">Requested event target missing.</h2>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-slate-100 p-4 md:p-6 space-y-4 font-sans text-slate-800 antialiased">
// //       {/* HEADER NAVIGATION INTERFACE STRIP */}
// //       <button
// //         onClick={() => navigate("/events")}
// //         className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition pl-1 select-none"
// //       >
// //         <FiArrowLeft /> Return to Event Catalog
// //       </button>

// //       {/* TWO-COLUMN SPLIT LAYER RESPONSIVE GRID LAYOUT PANEL */}
// //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

// //         {/* LEFT COMPONENT PANEL LAYER: YOUR ENTIRE UNALTERED DESIGN ELEMENT METADATA CARD */}
// //         <div className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-between">
// //           <div>
// //             <span className="text-xs text-slate-400 block mb-1 font-mono">ID: {String(event._id)}</span>
// //             <h2 className="text-2xl font-bold text-gray-800">{String(event.title || "Untitled Event")}</h2>
// //             <p className="text-gray-600 mt-2">{String(event.description || "No description provided")}</p>

// //             <div className="mt-4 text-sm text-gray-700 space-y-1 border-l-2 border-slate-200 pl-3">
// //               <p>📍 Building: {String(event.building || "N/A")}</p>
// //               <p>🏢 Floor: {String(event.floor || "N/A")}</p>
// //               <p>🚪 Room: {String(event.roomNumber || "N/A")}</p>
// //               {event.date && <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>}
// //               <p>⏰ Time: {String(event.startTime || "")} - {String(event.endTime || "")}</p>
// //             </div>
// //           </div>

// //           <div className="mt-6 flex flex-col items-center justify-center">
// //             {event.qrCode ? (
// //               <div className="space-y-4 w-full flex flex-col items-center">
// //                 <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 shadow-xs">
// //                   <img src={event.qrCode} alt="Event QR" className="w-44 h-44 object-contain rounded-lg bg-white" />
// //                 </div>
// //                 <button
// //                   onClick={handleDownload}
// //                   className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
// //                 >
// //                   📥 Download Ticket QR
// //                 </button>
// //               </div>
// //             ) : (
// //               <p className="text-xs text-slate-500 font-mono">No QR code available</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* RIGHT COMPONENT PANEL LAYER: STANDALONE INTUITIVE MULTI-DEVICE CHAT CONSOLE AREA */}
// //         <div className="lg:col-span-1 flex flex-col h-[550px] lg:h-full min-h-[500px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
// //           {/* TOP HEADER STATUS RIBBON */}
// //           <div className="bg-slate-900 px-5 py-4 text-white flex items-center gap-2 shrink-0 select-none">
// //             <FiMessageSquare className="text-xl text-blue-400" />
// //             <div>
// //               <h3 className="text-sm font-bold tracking-tight">Live Event Chatroom</h3>
// //               <p className="text-[10px] text-slate-400">Exchanging stream traces across active nodes.</p>
// //             </div>
// //           </div>

// //           {/* REAL-TIME CONVERSATION TIMELINE CHAT STREAM CONTAINER AREA */}
// //           <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
// //             {messages.length > 0 ? (
// //               messages.map((msg, index) => {
// //                 const senderId = msg?.sender?._id || msg?.sender || msg?.senderId;
// //                 const isMe = String(senderId) === String(currentUserId);

// //                 // Read statement mapper handles dynamic socket events and historical objects evenly
// //                 const renderedText = msg.text || msg.message || "";

// //                 return (
// //                   <div
// //                     key={index}
// //                     className={`flex flex-col max-w-[85%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
// //                   >
// //                     {!isMe && (
// //                       <span className="text-[9px] font-bold text-slate-400 mb-0.5 px-1 capitalize">
// //                         {msg.sender?.name || "Participant"} • <span className="text-blue-500 font-medium text-[8px]">{msg.sender?.role || "user"}</span>
// //                       </span>
// //                     )}
// //                     <div className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed break-all shadow-xs ${
// //                       isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
// //                     }`}>
// //                       {renderedText}
// //                     </div>
// //                     <span className="text-[8px] text-slate-400 mt-0.5 px-1 select-none">
// //                       {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "now"}
// //                     </span>
// //                   </div>
// //                 );
// //               })
// //             ) : (
// //               <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6 select-none">
// //                 <div className="text-2xl mb-1">💬</div>
// //                 <p className="text-xs font-bold text-slate-500">Live conversation trace empty</p>
// //                 <p className="text-[10px] text-slate-400 mt-0.5">Submit responses to activate real-time dialogue blocks.</p>
// //               </div>
// //             )}
// //             <div ref={messagesEndRef} />
// //           </div>

// //           {/* USER SELECTION ACTION TRANSMITTER SUBMISSION BAR FORM */}
// //           <form onSubmit={handleMessageSubmit} className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0">
// //             <input
// //               type="text"
// //               value={newMessage}
// //               onChange={(e) => setNewMessage(e.target.value)}
// //               placeholder="Send live responses across devices..."
// //               className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm"
// //             />
// //             <button
// //               type="submit"
// //               className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center"
// //             >
// //               <FiSend className="text-sm" />
// //             </button>
// //           </form>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // testing the announcement

// // import { useEffect, useState, useRef } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { io } from "socket.io-client";
// // import { getEventById } from "../../services/event.api";
// // import api from "../../services/api"; // 📦 Unified Axios instance
// // import { FiCalendar, FiMapPin, FiClock, FiSend, FiMessageSquare, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
// // import toast from "react-hot-toast";

// // export default function EventDetails() {
// //   const { id: eventId } = useParams();
// //   const navigate = useNavigate();
// //   const { user, token } = useSelector((state) => state.auth);

// //   // Safe extraction layer for user session criteria logs
// //   const userProfile = user?.data?.user || user?.user || user;
// //   const currentUserId = userProfile?._id || userProfile?.id;
// //   const currentUserRole = userProfile?.role ? String(userProfile.role).toLowerCase() : "";

// //   // Primary Component State Hooks
// //   const [event, setEvent] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Real-Time Socket Messaging State Hooks
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState("");
// //   const [socket, setSocket] = useState(null);
// //   const messagesEndRef = useRef(null);

// //   // --- Real-Time Announcement Form States ---
// //   const [announcementTitle, setAnnouncementTitle] = useState("");
// //   const [announcementMessage, setAnnouncementMessage] = useState("");
// //   const [sendingAlert, setSendingAlert] = useState(false);

// //   // 🔄 Lifecyle Hook 1: Core Initial Data Sync (Triggers on mount and refresh events)
// //   useEffect(() => {
// //     if (!eventId) return;

// //     // Action A: Fetch clean Event metadata records from MongoDB catalog collections
// //     const loadEventData = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await getEventById(eventId);
// //         if (res?.success && res?.data) {
// //           setEvent(res.data);
// //         }
// //       } catch (err) {
// //         console.error("Error reading event context parameters:", err);
// //         toast.error("Failed to compile targeted conference details.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     // Action B: Fetch historic chat logs from database instantly
// //     const fetchChatHistory = async () => {
// //       try {
// //         console.log("📡 Triggering Chat History API Call for event node:", eventId);
// //         const res = await api.get(`/chat/${eventId}`);
// //         console.log("📜 Raw Chat History HTTP Response Payload:", res);

// //         // Extract array elements safely out of your backend's custom json wrapper envelope
// //         const historicalArray = res?.data?.data || res?.data || res?.messages || res || [];
// //         if (Array.isArray(historicalArray)) {
// //           setMessages(historicalArray);
// //         }
// //       } catch (err) {
// //         console.warn("Could not load historical communication trace logs from MongoDB:", err);
// //       }
// //     };

// //     // Initialize both actions simultaneously to guarantee state persistence on page reload
// //     loadEventData();
// //     fetchChatHistory();
// //   }, [eventId]);

// //   // 🔌 Lifecycle Hook 2: Standalone Active Real-Time Socket Gateway Pipeline Listener
// //   useEffect(() => {
// //     if (!eventId) return;

// //     // Connect securely to your running Express socket gateway port
// //     const socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
// //       auth: { token: token || localStorage.getItem("token") },
// //       transports: ["websocket"]
// //     });
// //     setSocket(socketInstance);

// //     // Command backend configuration pipelines to assign this connection to specific event room
// //     socketInstance.emit("join_event_room", { eventId });

// //     // Intercept incoming real-time messages broadcast down from other system client tabs
// //     socketInstance.on("receive_message", (incomingMsg) => {
// //       console.log("📥 Incoming real-time message packet caught via socket:", incomingMsg);

// //       // Safety validation check to prevent duplicating the local user's optimistic text render
// //       const senderId = incomingMsg.sender?._id || incomingMsg.sender || incomingMsg.senderId;
// //       if (String(senderId) !== String(currentUserId)) {
// //         setMessages((prev) => [...prev, incomingMsg]);
// //       }
// //     });

// //     return () => {
// //       socketInstance.emit("leave_event_room", { eventId });
// //       socketInstance.disconnect();
// //     };
// //   }, [eventId, token, currentUserId]);

// //   // Force scroll target baseline alignment upon changes inside message state tracking arrays
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   const handleMessageSubmit = (e) => {
// //     e.preventDefault();
// //     if (!newMessage.trim() || !socket) return;

// //     const messagePayload = {
// //       eventId,
// //       text: newMessage, // Handled by cross-browser rendering engines matching socket payload specs
// //       message: newMessage, // Handled to fulfill backend schema validation rules
// //       sender: {
// //         _id: currentUserId,
// //         name: userProfile?.name || "Anonymous User",
// //         role: userProfile?.role || "participant"
// //       },
// //       createdAt: new Date().toISOString()
// //     };

// //     // Emit live text string downstream into socket room
// //     socket.emit("send_message", messagePayload);

// //     // Add text element optimistically straight into local memory view layout instantly
// //     setMessages((prev) => [...prev, messagePayload]);
// //     setNewMessage("");
// //   };

// //   // 📢 Handles broadcasting dynamic announcements via Socket context acknowledgements
// //   const handleAnnouncementSubmit = (e) => {
// //     e.preventDefault();
// //     if (!announcementTitle.trim() || !announcementMessage.trim() || !socket) return;

// //     setSendingAlert(true);

// //     const payload = {
// //       eventId,
// //       title: announcementTitle.trim(),
// //       message: announcementMessage.trim()
// //     };

// //     // Emit using the exact structural namespace event string string checked by your backend handler
// //     socket.emit("announcement", payload, (ack) => {
// //       setSendingAlert(false);
// //       if (ack?.success) {
// //         toast.success("Broadcast delivered successfully to all room nodes!");
// //         setAnnouncementTitle("");
// //         setAnnouncementMessage("");
// //       } else {
// //         toast.error(ack?.message || "Failed to deliver announcement payload.");
// //       }
// //     });
// //   };

// //   const handleDownload = () => {
// //     if (!event?.qrCode) return;
// //     const downloadLink = document.createElement("a");
// //     downloadLink.href = event.qrCode;
// //     downloadLink.download = `QR-${event.title?.replace(/\s+/g, "-") || "Ticket"}.png`;
// //     document.body.appendChild(downloadLink);
// //     downloadLink.click();
// //     document.body.removeChild(downloadLink);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-100">
// //         <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// //       </div>
// //     );
// //   }

// //   if (!event) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-slate-100">
// //         <h2 className="text-xl font-semibold text-red-500">Requested event target missing.</h2>
// //       </div>
// //     );
// //   }

// //   // Authorize managers flag calculation loop logic matches administrative privileges bounds
// //   const eventOrganizerId = String(event.organizer?._id || event.organizer || "");
// //   const isAuthorizedManager = currentUserRole === "admin" || (currentUserRole === "organizer" && eventOrganizerId === String(currentUserId));

// //   return (
// //     <div className="min-h-screen bg-slate-100 p-4 md:p-6 space-y-4 font-sans text-slate-800 antialiased">
// //       {/* HEADER NAVIGATION INTERFACE STRIP */}
// //       <button
// //         onClick={() => navigate("/events")}
// //         className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition pl-1 select-none"
// //       >
// //         <FiArrowLeft /> Return to Event Catalog
// //       </button>

// //       {/* TWO-COLUMN SPLIT LAYER RESPONSIVE GRID LAYOUT PANEL */}
// //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

// //         {/* LEFT COMPONENT COLUMN MATRIX CONTAINER */}
// //         <div className="lg:col-span-2 flex flex-col gap-6">

// //           {/* TOP ELEMENT CARD: DATA METADATA SPECIFICATIONS */}
// //           <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-between flex-1">
// //             <div>
// //               <span className="text-xs text-slate-400 block mb-1 font-mono">ID: {String(event._id)}</span>
// //               <h2 className="text-2xl font-bold text-gray-800">{String(event.title || "Untitled Event")}</h2>
// //               <p className="text-gray-600 mt-2">{String(event.description || "No description provided")}</p>

// //               <div className="mt-4 text-sm text-gray-700 space-y-1 border-l-2 border-slate-200 pl-3">
// //                 <p>📍 Building: {String(event.building || "N/A")}</p>
// //                 <p>🏢 Floor: {String(event.floor || "N/A")}</p>
// //                 <p>🚪 Room: {String(event.roomNumber || "N/A")}</p>
// //                 {event.date && <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>}
// //                 <p>⏰ Time: {String(event.startTime || "")} - {String(event.endTime || "")}</p>
// //               </div>
// //             </div>

// //             <div className="mt-6 flex flex-col items-center justify-center">
// //               {event.qrCode ? (
// //                 <div className="space-y-4 w-full flex flex-col items-center">
// //                   <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 shadow-xs">
// //                     <img src={event.qrCode} alt="Event QR" className="w-44 h-44 object-contain rounded-lg bg-white" />
// //                   </div>
// //                   <button
// //                     onClick={handleDownload}
// //                     className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
// //                   >
// //                     📥 Download Ticket QR
// //                   </button>
// //                 </div>
// //               ) : (
// //                 <p className="text-xs text-slate-500 font-mono">No QR code available</p>
// //               )}
// //             </div>
// //           </div>

// //           {/* LOWER ELEMENT CARD: REUSED ORGANIZER ALERT COMPOSER PANEL */}
// //           {isAuthorizedManager && (
// //             <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-100 animate-fadeIn">
// //               <div className="flex items-center gap-2 mb-4 select-none">
// //                 <div className="p-2 bg-amber-50 text-amber-600 rounded-xl text-md">📢</div>
// //                 <div>
// //                   <h3 className="text-sm font-bold text-slate-800">Broadcast Live Announcement</h3>
// //                   <p className="text-xs text-slate-400">Push real-time alerts and flashing banners directly to all active room participants.</p>
// //                 </div>
// //               </div>

// //               <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
// //                 <div>
// //                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">Alert Header / Title</label>
// //                   <input
// //                     type="text"
// //                     required
// //                     value={announcementTitle}
// //                     onChange={(e) => setAnnouncementTitle(e.target.value)}
// //                     placeholder="e.g., Room Change Notice or Schedule Delay"
// //                     className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">Broadcast Message Content</label>
// //                   <textarea
// //                     rows="3"
// //                     required
// //                     value={announcementMessage}
// //                     onChange={(e) => setAnnouncementMessage(e.target.value)}
// //                     placeholder="Type the warning message or announcement text details here..."
// //                     className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 leading-relaxed"
// //                   />
// //                 </div>

// //                 <div className="flex justify-end">
// //                   <button
// //                     type="submit"
// //                     disabled={sendingAlert || !socket}
// //                     className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-rose-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition transform active:scale-95 disabled:opacity-50 uppercase tracking-wider"
// //                   >
// //                     {sendingAlert ? "Transmitting Alert..." : "Emit Live Announcement"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           )}

// //         </div>

// //         {/* RIGHT COMPONENT PANEL LAYER: STANDALONE INTUITIVE MULTI-DEVICE CHAT CONSOLE AREA */}
// //         <div className="lg:col-span-1 flex flex-col h-[550px] lg:h-auto min-h-[500px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
// //           {/* TOP HEADER STATUS RIBBON */}
// //           <div className="bg-slate-900 px-5 py-4 text-white flex items-center gap-2 shrink-0 select-none">
// //             <FiMessageSquare className="text-xl text-blue-400" />
// //             <div>
// //               <h3 className="text-sm font-bold tracking-tight">Live Event Chatroom</h3>
// //               <p className="text-[10px] text-slate-400">Exchanging stream traces across active nodes.</p>
// //             </div>
// //           </div>

// //           {/* REAL-TIME CONVERSATION TIMELINE CHAT STREAM CONTAINER AREA */}
// //           <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
// //             {messages.length > 0 ? (
// //               messages.map((msg, index) => {
// //                 const senderId = msg?.sender?._id || msg?.sender || msg?.senderId;
// //                 const isMe = String(senderId) === String(currentUserId);

// //                 // Read statement mapper handles dynamic socket events and historical objects evenly
// //                 const renderedText = msg.text || msg.message || "";

// //                 return (
// //                   <div
// //                     key={index}
// //                     className={`flex flex-col max-w-[85%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
// //                   >
// //                     {!isMe && (
// //                       <span className="text-[9px] font-bold text-slate-400 mb-0.5 px-1 capitalize">
// //                         {msg.sender?.name || "Participant"} • <span className="text-blue-500 font-medium text-[8px]">{msg.sender?.role || "user"}</span>
// //                       </span>
// //                     )}
// //                     <div className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed break-all shadow-xs ${
// //                       isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
// //                     }`}>
// //                       {renderedText}
// //                     </div>
// //                     <span className="text-[8px] text-slate-400 mt-0.5 px-1 select-none">
// //                       {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "now"}
// //                     </span>
// //                   </div>
// //                 );
// //               })
// //             ) : (
// //               <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6 select-none">
// //                 <div className="text-2xl mb-1">💬</div>
// //                 <p className="text-xs font-bold text-slate-500">Live conversation trace empty</p>
// //                 <p className="text-[10px] text-slate-400 mt-0.5">Submit responses to activate real-time dialogue blocks.</p>
// //               </div>
// //             )}
// //             <div ref={messagesEndRef} />
// //           </div>

// //           {/* USER SELECTION ACTION TRANSMITTER SUBMISSION BAR FORM */}
// //           <form onSubmit={handleMessageSubmit} className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0">
// //             <input
// //               type="text"
// //               value={newMessage}
// //               onChange={(e) => setNewMessage(e.target.value)}
// //               placeholder="Send live responses across devices..."
// //               className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm"
// //             />
// //             <button
// //               type="submit"
// //               className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center"
// //             >
// //               <FiSend className="text-sm" />
// //             </button>
// //           </form>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// //testing 2

// import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";
// import { getEventById } from "../../services/event.api";
// import api from "../../services/api"; // 📦 Unified Axios instance
// import { FiCalendar, FiMapPin, FiClock, FiSend, FiMessageSquare, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
// import toast from "react-hot-toast";

// export default function EventDetails() {
//   const { id: eventId } = useParams();
//   const navigate = useNavigate();
//   const { user, token } = useSelector((state) => state.auth);

//   // 👥 Safely parse the user object layout structure whether it is nested under .data or flat
//   const userProfile = user?.data?.user || user?.user || user;
//   const currentUserId = userProfile?._id || userProfile?.id;
//   const currentUserRole = userProfile?.role ? String(userProfile.role).toLowerCase() : "";

//   // 📦 Component Data State Hooks
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 💬 Real-Time Live Chat State Hooks
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [socket, setSocket] = useState(null);
//   const messagesEndRef = useRef(null);

//   // 📢 Real-Time Announcement Form States (Used exclusively by the Organizer/Admin)
//   const [announcementTitle, setAnnouncementTitle] = useState("");
//   const [announcementMessage, setAnnouncementMessage] = useState("");
//   const [sendingAlert, setSendingAlert] = useState(false);

//   // 🔄 LIFECYCLE HOOK 1: CORE INITIAL DATA SYNC (Triggers automatically on mount and page refreshes)
//   useEffect(() => {
//     if (!eventId) return;

//     // Action A: Fetch Event structural metadata parameters from MongoDB
//     const loadEventData = async () => {
//       try {
//         setLoading(true);
//         const res = await getEventById(eventId);
//         if (res?.success && res?.data) {
//           setEvent(res.data);
//         }
//       } catch (err) {
//         console.error("Error reading event context parameters:", err);
//         toast.error("Failed to compile targeted conference details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Action B: Fetch historic chat message array logs from MongoDB database cache channel
//     const fetchChatHistory = async () => {
//       try {
//         console.log("📡 Triggering Chat History API Call for event node:", eventId);
//         const res = await api.get(`/chat/${eventId}`);
//         console.log("📜 Raw Chat History HTTP Response Payload:", res);

//         // Target the backend's exact data object envelope wrapper array cleanly
//         const historicalArray = res?.data?.data || res?.data || res?.messages || res || [];
//         if (Array.isArray(historicalArray)) {
//           setMessages(historicalArray);
//         }
//       } catch (err) {
//         console.warn("Could not load historical communication trace logs from MongoDB:", err);
//       }
//     };

//     // Run both actions immediately to ensure data populates correctly on layout reload
//     loadEventData();
//     fetchChatHistory();
//   }, [eventId]);

//   // 🔌 LIFECYCLE HOOK 2: STANDALONE ACTIVE REAL-TIME SOCKET GATEWAY PIPELINE LISTENER
//   useEffect(() => {
//     if (!eventId) return;

//     // Connect securely to your running Express backend WebSocket server port gateway
//     const socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
//       auth: { token: token || localStorage.getItem("token") },
//       transports: ["websocket"]
//     });
//     setSocket(socketInstance);

//     // Command backend configuration pipelines to assign this connection to specific event room
//     socketInstance.emit("join_event_room", { eventId });

//     // 📩 LISTENER A: Intercept incoming real-time chat messages from other tabs
//     socketInstance.on("receive_message", (incomingMsg) => {
//       console.log("📥 Incoming real-time message packet caught via socket:", incomingMsg);

//       // Safety validation check to prevent duplicating the local user's optimistic text render
//       const senderId = incomingMsg.sender?._id || incomingMsg.sender || incomingMsg.senderId;
//       if (String(senderId) !== String(currentUserId)) {
//         setMessages((prev) => [...prev, incomingMsg]);
//       }
//     });

//     // 📢 LISTENER B: ✅ ADDED - Intercept real-time organizer announcements pushed down by the server
//     socketInstance.on("new-announcement", (incomingAlert) => {
//       console.log("🔥 LIVE ANNOUNCEMENT RECEIVED ON PAGE:", incomingAlert);

//       // Display a high-visibility real-time toast alert to everyone currently active in this room
//       toast((t) => (
//         <div className="flex flex-col gap-1 text-slate-800">
//           <p className="font-bold flex items-center gap-1.5 text-amber-600 text-sm">
//             <span>📢</span> {incomingAlert.title || "New Announcement"}
//           </p>
//           <p className="text-xs text-slate-600 leading-relaxed">{incomingAlert.message}</p>
//         </div>
//       ), {
//         duration: 6000,
//         icon: '🔔',
//         style: { borderRadius: '1rem', background: '#ffffff', border: '1px solid #e2e8f0' }
//       });
//     });

//     // Clean up channel parameters and leave the room context when user leaves the component
//     return () => {
//       socketInstance.emit("leave_event_room", { eventId });
//       socketInstance.disconnect();
//     };
//   }, [eventId, token, currentUserId]);

//   // Force scroll target baseline alignment upon changes inside message state tracking arrays
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // 📝 CHAT SUBMISSION METHOD: Transmits a live communication packet to the room
//   const handleMessageSubmit = (e) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !socket) return;

//     const messagePayload = {
//       eventId,
//       text: newMessage, // Handled by cross-browser rendering engines matching socket payload specs
//       message: newMessage, // Handled to fulfill backend schema validation rules
//       sender: {
//         _id: currentUserId,
//         name: userProfile?.name || "Anonymous User",
//         role: userProfile?.role || "participant"
//       },
//       createdAt: new Date().toISOString()
//     };

//     // Emit live text string downstream into socket room
//     socket.emit("send_message", messagePayload);

//     // Add text element optimistically straight into local memory view layout instantly
//     setMessages((prev) => [...prev, messagePayload]);
//     setNewMessage("");
//   };

//   // 📢 ANNOUNCEMENT SUBMISSION METHOD: Transmits live alerts to the backend broadcaster route
//   const handleAnnouncementSubmit = (e) => {
//     e.preventDefault();
//     if (!announcementTitle.trim() || !announcementMessage.trim() || !socket) return;

//     setSendingAlert(true);

//     const payload = {
//       eventId,
//       title: announcementTitle.trim(),
//       message: announcementMessage.trim() // Maps accurately to your backend payload validation keys
//     };

//     // Emit using the exact structural namespace event string checked by your backend handler
//     socket.emit("announcement", payload, (ack) => {
//       setSendingAlert(false);
//       if (ack?.success) {
//         toast.success("Broadcast delivered successfully to all room nodes!");
//         setAnnouncementTitle("");
//         setAnnouncementMessage("");
//       } else {
//         toast.error(ack?.message || "Failed to deliver announcement payload.");
//       }
//     });
//   };

//   // 📥 TICKETS DOWNLOADER: Converts Base64 database strings into local system image downloads
//   const handleDownload = () => {
//     if (!event?.qrCode) return;
//     const downloadLink = document.createElement("a");
//     downloadLink.href = event.qrCode;
//     downloadLink.download = `QR-${event.title?.replace(/\s+/g, "-") || "Ticket"}.png`;
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-100">
//         <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-100">
//         <h2 className="text-xl font-semibold text-red-500">Requested event target missing.</h2>
//       </div>
//     );
//   }

//   // Authorize managers flag calculation loop logic matches administrative privileges bounds
//   const eventOrganizerId = String(event.organizer?._id || event.organizer || "");
//   const isAuthorizedManager = currentUserRole === "admin" || (currentUserRole === "organizer" && eventOrganizerId === String(currentUserId));

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 space-y-4 font-sans text-slate-800 antialiased">
//       {/* HEADER NAVIGATION INTERFACE STRIP */}
//       <button
//         onClick={() => navigate("/events")}
//         className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition pl-1 select-none"
//       >
//         <FiArrowLeft /> Return to Event Catalog
//       </button>

//       {/* TWO-COLUMN SPLIT LAYER RESPONSIVE GRID LAYOUT PANEL */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

//         {/* LEFT COMPONENT PANEL COLUMN LAYOUT CONTAINER */}
//         <div className="lg:col-span-2 flex flex-col gap-6">

//           {/* TOP ELEMENT CARD: DATA METADATA SPECIFICATIONS */}
//           <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-between flex-1">
//             <div>
//               <span className="text-xs text-slate-400 block mb-1 font-mono">ID: {String(event._id)}</span>
//               <h2 className="text-2xl font-bold text-gray-800">{String(event.title || "Untitled Event")}</h2>
//               <p className="text-gray-600 mt-2">{String(event.description || "No description provided")}</p>

//               <div className="mt-4 text-sm text-gray-700 space-y-1 border-l-2 border-slate-200 pl-3">
//                 <p>📍 Building: {String(event.building || "N/A")}</p>
//                 <p>🏢 Floor: {String(event.floor || "N/A")}</p>
//                 <p>🚪 Room: {String(event.roomNumber || "N/A")}</p>
//                 {event.date && <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>}
//                 <p>⏰ Time: {String(event.startTime || "")} - {String(event.endTime || "")}</p>
//               </div>
//             </div>

//             <div className="mt-6 flex flex-col items-center justify-center">
//               {event.qrCode ? (
//                 <div className="space-y-4 w-full flex flex-col items-center">
//                   <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 shadow-xs">
//                     <img src={event.qrCode} alt="Event QR" className="w-44 h-44 object-contain rounded-lg bg-white" />
//                   </div>
//                   <button
//                     onClick={handleDownload}
//                     className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
//                   >
//                     📥 Download Ticket QR
//                   </button>
//                 </div>
//               ) : (
//                 <p className="text-xs text-slate-500 font-mono">No QR code available</p>
//               )}
//             </div>
//           </div>

//           {/* LOWER ELEMENT CARD: ORGANIZER ALERT COMPOSER FORM (Role Gated) */}
//           {isAuthorizedManager && (
//             <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-100 animate-fadeIn">
//               <div className="flex items-center gap-2 mb-4 select-none">
//                 <div className="p-2 bg-amber-50 text-amber-600 rounded-xl text-md">📢</div>
//                 <div>
//                   <h3 className="text-sm font-bold text-slate-800">Broadcast Live Announcement</h3>
//                   <p className="text-xs text-slate-400">Push real-time alerts and flashing banners directly to all active room participants.</p>
//                 </div>
//               </div>

//               <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">Alert Header / Title</label>
//                   <input
//                     type="text"
//                     required
//                     value={announcementTitle}
//                     onChange={(e) => setAnnouncementTitle(e.target.value)}
//                     placeholder="e.g., Room Change Notice or Schedule Delay"
//                     className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">Broadcast Message Content</label>
//                   <textarea
//                     rows="3"
//                     required
//                     value={announcementMessage}
//                     onChange={(e) => setAnnouncementMessage(e.target.value)}
//                     placeholder="Type the warning message or announcement text details here..."
//                     className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 leading-relaxed"
//                   />
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     disabled={sendingAlert || !socket}
//                     className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-rose-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-wider"
//                   >
//                     {sendingAlert ? "Transmitting Alert..." : "Emit Live Announcement"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//         </div>

//         {/* RIGHT COMPONENT PANEL LAYER: LIVE CHAT TERMINAL */}
//         <div className="lg:col-span-1 flex flex-col h-[550px] lg:h-auto min-h-[500px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
//           {/* TOP HEADER STATUS RIBBON */}
//           <div className="bg-slate-900 px-5 py-4 text-white flex items-center gap-2 shrink-0 select-none">
//             <FiMessageSquare className="text-xl text-blue-400" />
//             <div>
//               <h3 className="text-sm font-bold tracking-tight">Live Event Chatroom</h3>
//               <p className="text-[10px] text-slate-400">Exchanging stream traces across active nodes.</p>
//             </div>
//           </div>

//           {/* REAL-TIME CONVERSATION TIMELINE CHAT STREAM */}
//           <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
//             {messages.length > 0 ? (
//               messages.map((msg, index) => {
//                 const senderId = msg?.sender?._id || msg?.sender || msg?.senderId;
//                 const isMe = String(senderId) === String(currentUserId);

//                 // Read statement mapper handles dynamic socket events and historical objects evenly
//                 const renderedText = msg.text || msg.message || "";

//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col max-w-[85%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
//                   >
//                     {!isMe && (
//                       <span className="text-[9px] font-bold text-slate-400 mb-0.5 px-1 capitalize">
//                         {msg.sender?.name || "Participant"} • <span className="text-blue-500 font-medium text-[8px]">{msg.sender?.role || "user"}</span>
//                       </span>
//                     )}
//                     <div className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed break-all shadow-xs ${
//                       isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
//                     }`}>
//                       {renderedText}
//                     </div>
//                     <span className="text-[8px] text-slate-400 mt-0.5 px-1 select-none">
//                       {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "now"}
//                     </span>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6 select-none">
//                 <div className="text-2xl mb-1">💬</div>
//                 <p className="text-xs font-bold text-slate-500">Live conversation trace empty</p>
//                 <p className="text-[10px] text-slate-400 mt-0.5">Submit responses to activate real-time dialogue blocks.</p>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* USER SELECTION ACTION TRANSMITTER SUBMISSION BAR FORM */}
//           <form onSubmit={handleMessageSubmit} className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Send live responses across devices..."
//               className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm"
//             />
//             <button
//               type="submit"
//               className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center"
//             >
//               <FiSend className="text-sm" />
//             </button>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

// testing with the storing announcements

import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getEventById } from "../../services/event.api";
import api from "../../services/api"; // 📦 Centralised Axios instance
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageSquare,
  FiArrowLeft,
  FiAlertCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import NavigateButton from "../../components/maps/NavigateButton";

export default function EventDetails() {
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  // 👥 Safe extraction layer for user session criteria logs
  const userProfile = user?.data?.user || user?.user || user;
  const currentUserId = userProfile?._id || userProfile?.id;
  const currentUserRole = userProfile?.role
    ? String(userProfile.role).toLowerCase()
    : "";

  // Primary Component State Hooks
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real-Time Socket Messaging State Hooks
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  // --- Announcement State Engines ---
  const [announcements, setAnnouncements] = useState([]); // Tracks historical logs list
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [sendingAlert, setSendingAlert] = useState(false);

  // 🔄 LIFECYCLE HOOK 1: CORE INITIAL DATA SYNC (Triggers automatically on mount and page refreshes)
  useEffect(() => {
    if (!eventId) return;

    // Action A: Fetch clean Event metadata records from MongoDB catalog collections
    const loadEventData = async () => {
      try {
        setLoading(true);
        const res = await getEventById(eventId);
        console.log(res);
        if (res?.success && res?.data) {
          setEvent(res.data);
        }
      } catch (err) {
        console.error("Error reading event context parameters:", err);
        toast.error("Failed to compile targeted conference details.");
      } finally {
        setLoading(false);
      }
    };

    // Action B: ✅ FIXED - Fetch historic announcement archive log directly matching your backend router path
    const fetchAnnouncementHistory = async () => {
      try {
        console.log(
          "📡 Triggering Announcement History API Call for event node:",
          eventId,
        );

        // Connects directly to router path: router.get("/event/:eventId", ...) mounted under /announcements base
        const res = await api.get(`/announcements/event/${eventId}`);
        console.log("📜 Raw Announcement History Response:", res);

        const list = res?.data?.data || res?.announcements || res || [];
        if (Array.isArray(list)) {
          setAnnouncements(list);
        }
      } catch (err) {
        console.warn(
          "Could not load historical announcement logs from MongoDB:",
          err,
        );
      }
    };

    // Action C: Fetch historic chat message array logs from database instantly on refresh
    const fetchChatHistory = async () => {
      try {
        console.log(
          "📡 Triggering Chat History API Call for event node:",
          eventId,
        );
        const res = await api.get(`/chat/${eventId}`);

        const historicalArray =
          res?.data?.data || res?.data || res?.messages || res || [];
        if (Array.isArray(historicalArray)) {
          setMessages(historicalArray);
        }
      } catch (err) {
        console.warn(
          "Could not load historical communication trace logs from MongoDB:",
          err,
        );
      }
    };

    // Initialize all actions simultaneously to guarantee complete state persistence on reload
    loadEventData();
    fetchAnnouncementHistory();
    fetchChatHistory();
  }, [eventId]);

  // 🔌 LIFECYCLE HOOK 2: STANDALONE ACTIVE REAL-TIME SOCKET GATEWAY PIPELINE LISTENER
  useEffect(() => {
    if (!eventId) return;

    // Connect securely to your running Express socket gateway port
    const socketInstance = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",
      {
        auth: { token: token || localStorage.getItem("token") },
        transports: ["websocket"],
      },
    );
    setSocket(socketInstance);

    // Command backend configuration pipelines to assign this connection to specific event room
    socketInstance.emit("join_event_room", { eventId });

    // 📩 LISTENER A: Intercept incoming real-time chat messages from other system client tabs
    socketInstance.on("receive_message", (incomingMsg) => {
      console.log(
        "📥 Incoming real-time message packet caught via socket:",
        incomingMsg,
      );
      const senderId =
        incomingMsg.sender?._id || incomingMsg.sender || incomingMsg.senderId;
      if (String(senderId) !== String(currentUserId)) {
        setMessages((prev) => [...prev, incomingMsg]);
      }
    });

    // 📢 LISTENER B: Intercept real-time organizer announcements pushed down by your backend handler
    socketInstance.on("new-announcement", (incomingAlert) => {
      console.log("🔥 LIVE ANNOUNCEMENT RECEIVED ON PAGE:", incomingAlert);

      // ✅ Append real-time alert dynamically onto your persistent feed history instantly
      setAnnouncements((prev) => [
        {
          title: incomingAlert.title,
          message: incomingAlert.message,
          createdAt: incomingAlert.createdAt || new Date().toISOString(),
        },
        ...prev,
      ]);

      // Display high-visibility notification toast widget
      toast(
        (t) => (
          <div className="flex flex-col gap-1 text-slate-800">
            <p className="font-bold flex items-center gap-1.5 text-amber-600 text-sm">
              <span>📢</span> {incomingAlert.title || "New Announcement"}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {incomingAlert.message}
            </p>
          </div>
        ),
        { duration: 6000, icon: "🔔" },
      );
    });

    return () => {
      socketInstance.emit("leave_event_room", { eventId });
      socketInstance.disconnect();
    };
  }, [eventId, token, currentUserId]);

  // Force scroll target baseline alignment upon changes inside message state tracking arrays
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const messagePayload = {
      eventId,
      text: newMessage,
      message: newMessage,
      sender: {
        _id: currentUserId,
        name: userProfile?.name || "Anonymous User",
        role: userProfile?.role || "participant",
      },
      createdAt: new Date().toISOString(),
    };

    socket.emit("send_message", messagePayload);
    setMessages((prev) => [...prev, messagePayload]);
    setNewMessage("");
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementMessage.trim() || !socket)
      return;

    setSendingAlert(true);

    const payload = {
      eventId,
      title: announcementTitle.trim(),
      message: announcementMessage.trim(),
    };

    // Emit data downstream across active user channels
    socket.emit("announcement", payload, (ack) => {
      setSendingAlert(false);
      if (ack?.success) {
        toast.success("Broadcast delivered successfully to all room nodes!");

        // Optimistically append local organizer submission to history logs array list instantly
        setAnnouncements((prev) => [
          {
            title: announcementTitle.trim(),
            message: announcementMessage.trim(),
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);

        setAnnouncementTitle("");
        setAnnouncementMessage("");
      } else {
        toast.error(ack?.message || "Failed to deliver announcement payload.");
      }
    });
  };

  const handleDownload = () => {
    if (!event?.qrCode) return;
    const downloadLink = document.createElement("a");
    downloadLink.href = event.qrCode;
    downloadLink.download = `QR-${event.title?.replace(/\s+/g, "-") || "Ticket"}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleLocImageDownload = () => {
    if (!event?.locImage) return;

    const downloadLink = document.createElement("a");
    downloadLink.href = event.locImage;

    downloadLink.download = `LOC-${event.title?.replace(/\s+/g, "-") || "Event"}.png`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h2 className="text-xl font-semibold text-red-500">
          Requested event target missing.
        </h2>
      </div>
    );
  }

  const eventOrganizerId = String(
    event.organizer?._id || event.organizer || "",
  );
  const isAuthorizedManager =
    currentUserRole === "admin" ||
    (currentUserRole === "organizer" &&
      eventOrganizerId === String(currentUserId));

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 space-y-4 font-sans text-slate-800 antialiased">
      {/* HEADER NAVIGATION INTERFACE STRIP */}
      <button
        onClick={() => navigate("/events")}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition pl-1 select-none"
      >
        <FiArrowLeft /> Return to Event Catalog
      </button>

      {/* TWO-COLUMN SPLIT LAYER RESPONSIVE GRID LAYOUT PANEL */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* LEFT COMPONENT PANEL COLUMN LAYOUT CONTAINER */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* TOP ELEMENT CARD: DATA METADATA SPECIFICATIONS */}
          <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-between flex-1">
            <div>
              <span className="text-xs text-slate-400 block mb-1 font-mono">
                ID: {String(event._id)}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">
                {String(event.title || "Untitled Event")}
              </h2>
              <p className="text-gray-600 mt-2">
                {String(event.description || "No description provided")}
              </p>

              <div className="mt-4 text-sm text-gray-700 space-y-1 border-l-2 border-slate-200 pl-3">
                <p>📍 Building: {String(event.building || "N/A")}</p>
                <p>🏢 Floor: {String(event.floor || "N/A")}</p>
                <p>🚪 Room: {String(event.roomNumber || "N/A")}</p>
                {event.date && (
                  <p>📅 Date: {new Date(event.date).toLocaleDateString()}</p>
                )}
                <p>
                  ⏰ Time: {String(event.startTime || "")} -{" "}
                  {String(event.endTime || "")}
                </p>

                {/* added the navigation map point here  */}
                {event.coordinates && (
                  <NavigateButton coordinates={event.coordinates} />
                )}
              </div>
            </div>
            <div className=" bg-amber-50 flex flex-row gap-4 justify-center">
              <div className="mt-6 flex flex-col items-center justify-center">
                {event.qrCode ? (
                  <div className="space-y-4 w-full flex flex-col items-center">
                    <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 shadow-xs">
                      <img
                        src={event.qrCode}
                        alt="Event QR"
                        className="w-44 h-44 object-contain rounded-lg bg-white"
                      />
                    </div>
                    <button
                      onClick={handleDownload}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
                    >
                      📥 Download Ticket QR
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 font-mono">
                    No QR code available
                  </p>
                )}
              </div>
              <div>
                {event.locImage && (
                  <div className="mt-6 flex flex-col items-center justify-center">
                    <div className="space-y-4 w-full flex flex-col items-center">
                      <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50 shadow-xs">
                        <img
                          src={event.locImage}
                          alt="Event Location"
                          className="w-44 h-44 object-cover rounded-lg bg-white"
                        />
                      </div>

                      <button
                        onClick={handleLocImageDownload}
                        className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
                      >
                        📍 Download Location Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LOWER ELEMENT CARD: ORGANIZER ALERT COMPOSER FORM (Role Gated) */}
          {isAuthorizedManager && (
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-100 animate-fadeIn">
              <div className="flex items-center gap-2 mb-4 select-none">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl text-md">
                  📢
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Broadcast Live Announcement
                  </h3>
                  <p className="text-xs text-slate-400">
                    Push real-time alerts and flashing banners directly to all
                    active room participants.
                  </p>
                </div>
              </div>

              <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                    Alert Header / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={announcementTitle}
                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                    placeholder="e.g., Room Change Notice or Schedule Delay"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 pl-0.5">
                    Broadcast Message Content
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={announcementMessage}
                    onChange={(e) => setAnnouncementMessage(e.target.value)}
                    placeholder="Type the warning message or announcement text details here..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 leading-relaxed"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={sendingAlert || !socket}
                    className="bg-linear-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-rose-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-wider"
                  >
                    {sendingAlert
                      ? "Transmitting Alert..."
                      : "Emit Live Announcement"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Persistent Audit Log History Ticker Feed Box */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>🔔</span> Announcement History Logs
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {announcements.length > 0 ? (
                announcements.map((ann, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 relative animate-fadeIn"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {ann.title}
                      </h4>
                      <span className="text-[9px] font-mono text-slate-400 shrink-0">
                        {ann.createdAt
                          ? new Date(ann.createdAt).toLocaleDateString()
                          : "just now"}
                      </span>
                    </div>
                    {/* ✅ FIXED FALLBACK: Resolves 'ann.message' from Mongoose array logs or 'ann.content' from socket payload variables */}
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words">
                      {ann.message || ann.content || ""}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-6 font-medium">
                  No alerts or announcements broadcasted yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT PANEL LAYER: LIVE CHAT TERMINAL */}
        <div className="lg:col-span-1 flex flex-col h-[550px] lg:h-auto min-h-[500px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {/* TOP HEADER STATUS RIBBON */}
          <div className="bg-slate-900 px-5 py-4 text-white flex items-center gap-2 shrink-0 select-none">
            <FiMessageSquare className="text-xl text-blue-400" />
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                Live Event Chatroom
              </h3>
              <p className="text-[10px] text-slate-400">
                Exchanging stream traces across active nodes.
              </p>
            </div>
          </div>

          {/* REAL-TIME CONVERSATION TIMELINE CHAT STREAM */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
            {messages.length > 0 ? (
              messages.map((msg, index) => {
                const senderId =
                  msg?.sender?._id || msg?.sender || msg?.senderId;
                const isMe = String(senderId) === String(currentUserId);
                const renderedText = msg.text || msg.message || "";

                return (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
                  >
                    {!isMe && (
                      <span className="text-[9px] font-bold text-slate-400 mb-0.5 px-1 capitalize">
                        {msg.sender?.name || "Participant"} •{" "}
                        <span className="text-blue-500 font-medium text-[8px]">
                          {msg.sender?.role || "user"}
                        </span>
                      </span>
                    )}
                    <div
                      className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed break-all shadow-xs ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
                      }`}
                    >
                      {renderedText}
                    </div>
                    <span className="text-[8px] text-slate-400 mt-0.5 px-1 select-none">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "now"}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6 select-none">
                <div className="text-2xl mb-1">💬</div>
                <p className="text-xs font-bold text-slate-500">
                  Live conversation trace empty
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Submit responses to activate real-time dialogue blocks.
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* USER SELECTION ACTION TRANSMITTER SUBMISSION BAR FORM */}
          <form
            onSubmit={handleMessageSubmit}
            className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Send live responses across devices..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm"
            />
            <button
              type="submit"
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center"
            >
              <FiSend className="text-sm" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
