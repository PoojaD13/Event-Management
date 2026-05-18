// // // import Message from "../models/Message.js";

// // // export const chatSocket = (io, socket) => {
// // //   /**
// // //    * JOIN EVENT ROOM
// // //    */
// // //   socket.on("join-event", (eventId) => {
// // //     socket.join(eventId);
// // //   });

// // //   /**
// // //    * SEND MESSAGE
// // //    */
// // //   socket.on("send-message", async (payload) => {
// // //     try {
// // //       const message = await Message.create({
// // //         eventId: payload.eventId,
// // //         sender: socket.user.id,
// // //         message: payload.message,
// // //       });

// // //       const populated = await Message.findById(message._id).populate(
// // //         "sender",
// // //         "name email",
// // //       );

// // //       io.to(payload.eventId).emit("receive-message", populated);
// // //     } catch (err) {
// // //       console.log("Chat error:", err.message);
// // //     }
// // //   });
// // // };
// // import Message from "../models/Message.js";

// // export default (io, socket) => {
// //   socket.on("join-event", (eventId) => {
// //     socket.join(eventId);
// //   });

// //   socket.on("send-message", async (payload) => {
// //     const message = await Message.create({
// //       eventId: payload.eventId,
// //       sender: socket.user.id,
// //       message: payload.message,
// //     });

// //     const populated = await message.populate("sender", "name email");

// //     io.to(payload.eventId).emit("receive-message", populated);
// //   });
// // };

// works fine in the test 
// import Message from "../models/Message.js";

// export default (io, socket) => {
//   socket.on("send-message", async (payload) => {
//     try {
//       if (!payload?.eventId || !payload?.message) return;

//       const message = await Message.create({
//         eventId: payload.eventId,
//         sender: socket.user.id,
//         message: payload.message.trim(),
//       });

//       const populated = await Message.findById(message._id)
//         .populate("sender", "name email");

//       io.to(payload.eventId).emit("receive-message", populated);
//     } catch (err) {
//       console.log("Chat error:", err.message);
//     }
//   });
// };

// according to the frontend 
import Message from "../models/Message.js";

export default (io, socket) => {
  // 1. ✅ ADDED ROOM LISTENER: Listens to the exact front-end event string name
  socket.on("join_event_room", ({ eventId }) => {
    if (!eventId) return;
    socket.join(eventId);
    console.log(`👤 User joined isolated event chatroom: ${eventId}`);
  });

  socket.on("leave_event_room", ({ eventId }) => {
    if (!eventId) return;
    socket.leave(eventId);
    console.log(`👤 User exited event chatroom: ${eventId}`);
  });

  // 2. ✅ FIXED EVENT STRING: Matches front-end emit name 'send_message'
  socket.on("send_message", async (payload) => {
    try {
      // ✅ FIX: Extract 'text' instead of 'message' to match front-end payload properties
      const { eventId, text } = payload; 
      if (!eventId || !text) return;

      // Extract sender user ID embedded securely by your authentication middleware
      const senderId = socket.user?.id || socket.user?._id || payload.sender?._id;

      if (!senderId) {
        console.error("❌ Chat transaction error: Unauthorized or unauthenticated socket channel context");
        return;
      }

      // 3. 💾 COMMIT TO MONGODB: Save text parameter strings inside collection layout schema
      const message = await Message.create({
        eventId: eventId,
        sender: senderId,
        message: text.trim(), // Ensure your Mongoose Schema has the key 'message' or 'text' configured
      });

      // 4. 🔗 AGGREGATE META PROFILE VARIABLES: Pre-populate profile layout definitions
      const populated = await Message.findById(message._id)
        .populate("sender", "name email role");

      console.log(`💾 Message safely saved to MongoDB instance: [${message._id}]`);

      // 5. 📢 REAL-TIME REFLECTION BROADCAST: Push the payload back up to all listening room clients
      // We change io.to() to socket.to() so it broadcasts to everyone else, while your client renders optimistically
      socket.to(eventId).emit("receive_message", populated);

    } catch (err) {
      console.error("❌ Chat Socket Execution Transaction Failure:", err.message);
    }
  });
};
