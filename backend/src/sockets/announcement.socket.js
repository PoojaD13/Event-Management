// // // import Event from "../models/Event.js";

// // // export default (io, socket) => {
// // //   socket.on("announcement", async (payload) => {
// // //     try {
// // //       const event = await Event.findById(payload.eventId);
// // //       if (!event) return;

// // //       const isOrganizer = event.organizer.toString() === socket.user.id;

// // //       if (!isOrganizer) return;

// // //       io.to(payload.eventId).emit("new-announcement", {
// // //         title: payload.title,
// // //         message: payload.message,
// // //         eventId: payload.eventId,
// // //       });
// // //     } catch (err) {
// // //       console.log("Announcement socket error:", err.message);
// // //     }
// // //   });
// // // };

// // import Event from "../models/Event.js";

// // export default (io, socket) => {
// //   socket.on("announcement", async (payload) => {
// //     try {
// //       console.log("🔥 ANNOUNCEMENT EVENT HIT:", payload);
// //       const event = await Event.findById(payload.eventId);

// //       if (!event) return;

// //       if (event.organizer.toString() !== socket.user.id) return;

// //       io.to(payload.eventId).emit("new-announcement", {
// //         title: payload.title,
// //         message: payload.message,
// //         eventId: payload.eventId,
// //       });
// //     } catch (err) {
// //       console.log("Announcement error:", err.message);
// //     }
// //   });
// // };

// import Event from "../models/Event.js";

// const announcementSocket = (io, socket) => {
//   console.log("announcementSocket initialized for:", socket.user.id);

//   /**
//    * CREATE ANNOUNCEMENT
//    */
//   socket.on("announcement", async (payload, callback) => {
//     try {
//       console.log("🔥 ANNOUNCEMENT RECEIVED:", payload);

//       const { eventId, title, message } = payload;

//       /**
//        * VALIDATION
//        */
//       if (!eventId || !title || !message) {
//         console.log("Missing fields");

//         if (callback) {
//           return callback({
//             success: false,
//             message: "Missing required fields",
//           });
//         }
//         return;
//       }

//       /**
//        * FETCH EVENT
//        */
//       const event = await Event.findById(eventId);

//       if (!event) {
//         console.log("Event not found");

//         if (callback) {
//           return callback({
//             success: false,
//             message: "Event not found",
//           });
//         }
//         return;
//       }

//       /**
//        * AUTH CHECK (ONLY ORGANIZER CAN SEND)
//        */
//       const isOrganizer = event.organizer.toString() === socket.user.id;

//       if (!isOrganizer) {
//         console.log("Unauthorized announcement attempt");

//         if (callback) {
//           return callback({
//             success: false,
//             message: "Unauthorized",
//           });
//         }
//         return;
//       }

//       /**
//        * BROADCAST
//        */
//       io.to(eventId).emit("new-announcement", {
//         title,
//         message,
//         eventId,
//         sentBy: socket.user.id,
//         createdAt: new Date(),
//       });

//       console.log("✅ Announcement broadcasted to:", eventId);

//       /**
//        * ACK RESPONSE
//        */
//       if (callback) {
//         callback({
//           success: true,
//         });
//       }
//     } catch (err) {
//       console.log("Announcement socket error:", err.message);

//       if (callback) {
//         callback({
//           success: false,
//           message: err.message,
//         });
//       }
//     }
//   });
// };

// export default announcementSocket;


import Event from "../models/Event.js";
import Announcement from "../models/Announcement.js"; // 👈 Ensure path points to your existing schema file

const announcementSocket = (io, socket) => {
  console.log("announcementSocket initialized for user:", socket.user.id);

  socket.on("announcement", async (payload, callback) => {
    try {
      console.log("🔥 ANNOUNCEMENT RECEIVED:", payload);
      const { eventId, title, message } = payload;

      if (!eventId || !title || !message) {
        if (callback) return callback({ success: false, message: "Missing required fields" });
        return;
      }

      const eventDocument = await Event.findById(eventId);
      if (!eventDocument) {
        if (callback) return callback({ success: false, message: "Event not found" });
        return;
      }

      const isOrganizer = eventDocument.organizer.toString() === socket.user.id;
      if (!isOrganizer) {
        if (callback) return callback({ success: false, message: "Unauthorized attempt" });
        return;
      }

      // 💾 ✅ FIX: Match the exact key schema fields ('event' and 'createdBy') declared in your Mongoose Model
      const newAnnouncement = await Announcement.create({
        event: eventId,        // 👈 Maps payload.eventId to your schema's 'event' field
        title: title,
        message: message,
        createdBy: socket.user.id // 👈 Maps your verified socket user context to 'createdBy'
      });

      console.log(`💾 Announcement securely committed to MongoDB with ID: [${newAnnouncement._id}]`);

      // 📢 Broadcast live stream parameters downstream to all active room subscribers
      io.to(eventId).emit("new-announcement", {
        _id: newAnnouncement._id,
        title,
        message,
        eventId,
        sentBy: socket.user.id,
        createdAt: newAnnouncement.createdAt,
      });

      if (callback) {
        callback({ success: true });
      }
    } catch (err) {
      console.error("❌ Announcement transaction write failure caught:", err.message);
      if (callback) {
        callback({ success: false, message: err.message });
      }
    }
  });
};

export default announcementSocket;
