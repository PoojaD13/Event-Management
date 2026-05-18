// // // const eventUsers = new Map();

// // // export default (io, socket) => {
// // //   /**
// // //    * JOIN EVENT (single source of truth)
// // //    */
// // //   socket.on("join-event", (eventId) => {
// // //     socket.join(eventId);

// // //     if (!eventUsers.has(eventId)) {
// // //       eventUsers.set(eventId, new Set());
// // //     }

// // //     eventUsers.get(eventId).add(socket.user.id);

// // //     const users = Array.from(eventUsers.get(eventId));

// // //     io.to(eventId).emit("online-users", {
// // //       eventId,
// // //       users,
// // //     });

// // //     const roomSize = io.sockets.adapter.rooms.get(eventId)?.size || 0;

// // //     io.to(eventId).emit("attendee-count", {
// // //       eventId,
// // //       count: roomSize,
// // //     });
// // //   });

// // //   /**
// // //    * LEAVE EVENT
// // //    */
// // //   socket.on("leave-event", (eventId) => {
// // //     socket.leave(eventId);

// // //     if (eventUsers.has(eventId)) {
// // //       eventUsers.get(eventId).delete(socket.user.id);
// // //     }

// // //     const users = eventUsers.get(eventId)
// // //       ? Array.from(eventUsers.get(eventId))
// // //       : [];

// // //     io.to(eventId).emit("online-users", {
// // //       eventId,
// // //       users,
// // //     });
// // //   });

// // //   /* Join Event */
// // //   socket.on("join-event", (eventId) => {
// // //     socket.join(eventId);

// // //     socket.to(eventId).emit("user-joined-chat", {
// // //       userId: socket.user.id,
// // //     });
// // //   });

// // //   /**
// // //    * CLEANUP ON DISCONNECT
// // //    */
// // //   socket.on("disconnect", () => {
// // //     for (const [eventId, users] of eventUsers.entries()) {
// // //       users.delete(socket.user.id);

// // //       io.to(eventId).emit("online-users", {
// // //         eventId,
// // //         users: Array.from(users),
// // //       });

// // //       const roomSize = io.sockets.adapter.rooms.get(eventId)?.size || 0;

// // //       io.to(eventId).emit("attendee-count", {
// // //         eventId,
// // //         count: roomSize,
// // //       });
// // //     }
// // //   });
// // // };
// // const eventUsers = new Map();

// // export default (io, socket) => {
// //   /**
// //    * JOIN EVENT (single source of truth)
// //    */
// //   socket.on("join-event", (eventId) => {
// //     console.log("📌 JOIN EVENT:", eventId);

// //     socket.join(eventId);

// //     // track users
// //     if (!eventUsers.has(eventId)) {
// //       eventUsers.set(eventId, new Set());
// //     }

// //     eventUsers.get(eventId).add(socket.user.id);

// //     const users = Array.from(eventUsers.get(eventId));

// //     io.to(eventId).emit("online-users", {
// //       eventId,
// //       users,
// //     });

// //     const roomSize = io.sockets.adapter.rooms.get(eventId)?.size || 0;

// //     io.to(eventId).emit("attendee-count", {
// //       eventId,
// //       count: roomSize,
// //     });
// //   });

// //   /**
// //    * LEAVE EVENT
// //    */
// //   socket.on("leave-event", (eventId) => {
// //     socket.leave(eventId);

// //     if (eventUsers.has(eventId)) {
// //       eventUsers.get(eventId).delete(socket.user.id);
// //     }

// //     const users = eventUsers.get(eventId)
// //       ? Array.from(eventUsers.get(eventId))
// //       : [];

// //     io.to(eventId).emit("online-users", {
// //       eventId,
// //       users,
// //     });
// //   });

// //   /**
// //    * CLEANUP ON DISCONNECT
// //    */
// //   socket.on("disconnect", () => {
// //     for (const [eventId, users] of eventUsers.entries()) {
// //       users.delete(socket.user.id);

// //       io.to(eventId).emit("online-users", {
// //         eventId,
// //         users: Array.from(users),
// //       });

// //       const roomSize = io.sockets.adapter.rooms.get(eventId)?.size || 0;

// //       io.to(eventId).emit("attendee-count", {
// //         eventId,
// //         count: roomSize,
// //       });
// //     }
// //   });
// // };

// const eventSocket = (io, socket) => {
//   console.log("eventSocket initialized for:", socket.user.id);

//   socket.on("join-event", (eventId) => {
//     console.log("JOIN EVENT RECEIVED");
//     console.log("eventId:", eventId);

//     socket.join(eventId);

//     console.log("Socket joined room:", eventId);
//     console.log("Current rooms:", [...socket.rooms]);

//     // optional ack
//     socket.emit("joined-event", {
//       success: true,
//       eventId,
//     });
//   });

//   socket.onAny((event, ...args) => {
//     console.log("[eventSocket] EVENT:", event, args);
//   });
// };

// export default eventSocket;

const eventUsers = new Map();

const eventSocket = (io, socket) => {
  console.log("eventSocket initialized for:", socket.user.id);

  /**
   * JOIN EVENT
   */
  socket.on("join-event", (eventId, callback) => {
    try {
      console.log("JOIN EVENT:", eventId);

      /**
       * JOIN ROOM
       */
      socket.join(eventId);

      /**
       * TRACK USERS
       */
      if (!eventUsers.has(eventId)) {
        eventUsers.set(eventId, new Set());
      }

      eventUsers.get(eventId).add(socket.user.id);

      /**
       * ONLINE USERS
       */
      const users = Array.from(eventUsers.get(eventId));

      io.to(eventId).emit("online-users", {
        eventId,
        users,
      });

      /**
       * ATTENDEE COUNT
       */
      const roomSize = io.sockets.adapter.rooms.get(eventId)?.size || 0;

      io.to(eventId).emit("attendee-count", {
        eventId,
        count: roomSize,
      });

      /**
       * USER JOINED EVENT
       */
      socket.to(eventId).emit("user-joined-event", {
        userId: socket.user.id,
        eventId,
      });

      console.log(`${socket.user.id} joined room ${eventId}`);

      console.log("ROOM MEMBERS:", roomSize);

      /**
       * ACKNOWLEDGEMENT
       */
      if (callback) {
        callback({
          success: true,
          eventId,
        });
      }
    } catch (err) {
      console.log("join-event ERROR:", err.message);

      if (callback) {
        callback({
          success: false,
          message: err.message,
        });
      }
    }
  });

  /**
   * LEAVE EVENT
   */
  socket.on("leave-event", (eventId) => {
    try {
      socket.leave(eventId);

      if (eventUsers.has(eventId)) {
        eventUsers.get(eventId).delete(socket.user.id);
      }

      const users = eventUsers.has(eventId)
        ? Array.from(eventUsers.get(eventId))
        : [];

      io.to(eventId).emit("online-users", {
        eventId,
        users,
      });

      const roomSize = io.sockets.adapter.rooms.get(eventId)?.size || 0;

      io.to(eventId).emit("attendee-count", {
        eventId,
        count: roomSize,
      });

      socket.to(eventId).emit("user-left-event", {
        userId: socket.user.id,
        eventId,
      });

      console.log(`${socket.user.id} left ${eventId}`);
    } catch (err) {
      console.log("leave-event ERROR:", err.message);
    }
  });

  /**
   * DISCONNECT CLEANUP
   */
  socket.on("disconnect", () => {
    try {
      for (const [eventId, users] of eventUsers.entries()) {
        /**
         * REMOVE USER
         */
        users.delete(socket.user.id);

        /**
         * REMOVE EMPTY ROOMS
         */
        if (users.size === 0) {
          eventUsers.delete(eventId);
          continue;
        }

        /**
         * UPDATE ONLINE USERS
         */
        io.to(eventId).emit("online-users", {
          eventId,
          users: Array.from(users),
        });

        /**
         * UPDATE COUNT
         */
        const roomSize = io.sockets.adapter.rooms.get(eventId)?.size || 0;

        io.to(eventId).emit("attendee-count", {
          eventId,
          count: roomSize,
        });
      }

      console.log(`Disconnected: ${socket.user.id}`);
    } catch (err) {
      console.log("disconnect cleanup ERROR:", err.message);
    }
  });
};

export default eventSocket;
