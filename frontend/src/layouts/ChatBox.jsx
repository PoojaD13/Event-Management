import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { FiSend, FiMessageSquare } from "react-icons/fi";

export default function ChatBox({ eventId }) {
  const { user, token } = useSelector((state) => state.auth);
  const userProfile = user?.data?.user || user?.user || user;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  
  const messagesEndRef = useRef(null);

  // 1. Establish real-time Socket connection on mounting cycle
  useEffect(() => {
    if (!eventId) return;

    // Connect to your Express Socket gateway port
    const socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
      auth: { token: token || localStorage.getItem("token") },
      transports: ["websocket"]
    });

    setSocket(socketInstance);

    // 2. Command backend to isolate this channel to the unique Event ID room
    socketInstance.emit("join_event_room", { eventId });

    // 3. Listen for incoming message updates from the server pipeline
    socketInstance.on("receive_message", (incomingMsg) => {
      setMessages((prev) => [...prev, incomingMsg]);
    });

    // Clean up connection when user closes or leaves this view path
    return () => {
      socketInstance.emit("leave_event_room", { eventId });
      socketInstance.disconnect();
    };
  }, [eventId, token]);

  // 4. Force container layout viewport auto-scroll alignment on data shifts
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const messagePayload = {
      eventId,
      text: newMessage,
      sender: {
        _id: userProfile?._id,
        name: userProfile?.name || "Anonymous User",
        role: userProfile?.role || "participant"
      },
      createdAt: new Date().toISOString()
    };

    // 5. Emit message payload straight down the socket infrastructure pipeline
    socket.emit("send_message", messagePayload);
    
    // Optimistically update local view array frame
    setMessages((prev) => [...prev, messagePayload]);
    setNewMessage("");
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col h-[500px] overflow-hidden">
      {/* CHAT CONTAINER BAR HEADER */}
      <div className="bg-slate-900 px-6 py-4 text-white flex items-center gap-2">
        <FiMessageSquare className="text-xl text-blue-400" />
        <div>
          <h3 className="text-sm font-bold tracking-tight">Live Event Chatroom</h3>
          <p className="text-[11px] text-slate-400">Collaborate with live participants inside this venue.</p>
        </div>
      </div>

      {/* MESSAGE STREAM TRACKING SCREEN SCREEN */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isMe = String(msg.sender?._id || msg.sender) === String(userProfile?._id);
            return (
              <div
                key={index}
                className={`flex flex-col max-w-[75%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                {/* Sender Name label block info */}
                {!isMe && (
                  <span className="text-[10px] font-bold text-slate-500 mb-0.5 px-1 capitalize">
                    {msg.sender?.name} • <span className="text-blue-500 font-medium text-[9px]">{msg.sender?.role}</span>
                  </span>
                )}
                
                {/* Text Dialogue Bubble blocks */}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-all shadow-xs ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                
                {/* Chrono timestamp log labels */}
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-2">💬</div>
            <p className="text-xs font-bold text-slate-500">The chat stream is empty</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Send a transmission message to activate live chat loops.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* USER DESKTOP SUBMISSION INTERFACE FORM BAR */}
      <form onSubmit={handleMessageSubmit} className="p-3 border-t border-slate-200 bg-white flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your event message channel response here..."
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder-slate-400"
        />
        <button
          type="submit"
          className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/10 transition active:scale-95 flex items-center justify-center"
        >
          <FiSend className="text-md" />
        </button>
      </form>
    </div>
  );
}
