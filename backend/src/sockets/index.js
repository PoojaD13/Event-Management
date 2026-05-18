// // import jwt from "jsonwebtoken";
// // import chatSocket from "./chat.socket.js";
// // import announcementSocket from "./announcement.socket.js";
// // import presenceSocket from "./presence.socket.js";

// // const initSocket = (io) => {
// //   /**
// //    * AUTH
// //    */
// //   io.use((socket, next) => {
// //     try {
// //       const token =
// //         socket.handshake.auth?.token || socket.handshake.query?.token;

// //       if (!token) return next(new Error("No token"));

// //       socket.user = jwt.verify(token, process.env.JWT_SECRET);
// //       next();
// //     } catch {
// //       next(new Error("Unauthorized"));
// //     }
// //   });

// //   /**
// //    * CONNECTION
// //    */
// //   io.on("connection", (socket) => {
// //     console.log("Socket connected:", socket.user.id);

// //     chatSocket(io, socket);
// //     announcementSocket(io, socket);
// //     presenceSocket(io, socket);
// //   });
// // };

// // export default initSocket;

// import jwt from "jsonwebtoken";

// import eventSocket from "./event.socket.js";
// import chatSocket from "./chat.socket.js";
// import announcementSocket from "./announcement.socket.js";
// import presenceSocket from "./presence.socket.js";

// const initSocket = (io) => {
//   /**
//    * AUTH
//    */
//   io.use((socket, next) => {
//     try {
//       const token =
//         socket.handshake.auth?.token || socket.handshake.query?.token;

//       if (!token) return next(new Error("No token"));

//       socket.user = jwt.verify(token, process.env.JWT_SECRET);
//       next();
//     } catch {
//       next(new Error("Unauthorized"));
//     }
//   });

//   /**
//    * CONNECTION
//    */
//   //   io.on("connection", (socket) => {
//   //     console.log("Socket connected:", socket.user.id);

//   //     eventSocket(io, socket);
//   //     chatSocket(io, socket);
//   //     announcementSocket(io, socket);
//   //     presenceSocket(io, socket);
//   // });

//   io.on("connection", (socket) => {
//     console.log("Socket connected:", socket.user.id);

//     try {
//       console.log("loading eventSocket");
//       eventSocket(io, socket);
//       console.log("eventSocket loaded");
//     } catch (e) {
//       console.log("eventSocket ERROR:", e.message);
//     }

//     chatSocket(io, socket);
//     announcementSocket(io, socket);
//     presenceSocket(io, socket);
//   });
// };

// export default initSocket;


import jwt from "jsonwebtoken";

import eventSocket from "./event.socket.js";
import chatSocket from "./chat.socket.js";
import announcementSocket from "./announcement.socket.js";
import presenceSocket from "./presence.socket.js";

const initSocket = (io) => {
  /**
   * SOCKET AUTH MIDDLEWARE
   */
  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.query?.token;

      if (!token) {
        return next(new Error("Authentication token missing"));
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      socket.user = decoded;

      next();
    } catch (err) {
      console.log("Socket auth error:", err.message);

      next(new Error("Unauthorized"));
    }
  });

  /**
   * SOCKET CONNECTION
   */
  io.on("connection", (socket) => {
    console.log("=================================");
    console.log("Socket Connected");
    console.log("User ID:", socket.user.id);
    console.log("Socket ID:", socket.id);
    console.log("=================================");

    /**
     * GLOBAL DEBUG LOGGER
     * REMOVE IN PRODUCTION
     */
    socket.onAny((event, ...args) => {
      console.log(`[${socket.id}] EVENT =>`, event);
      console.log("ARGS =>", args);
    });

    /**
     * LOAD SOCKET MODULES
     */
    try {
      eventSocket(io, socket);
      console.log("eventSocket loaded");
    } catch (err) {
      console.log("eventSocket ERROR:", err.message);
    }

    try {
      announcementSocket(io, socket);
      console.log("announcementSocket loaded");
    } catch (err) {
      console.log("announcementSocket ERROR:", err.message);
    }

    try {
      chatSocket(io, socket);
      console.log("chatSocket loaded");
    } catch (err) {
      console.log("chatSocket ERROR:", err.message);
    }

    try {
      presenceSocket(io, socket);
      console.log("presenceSocket loaded");
    } catch (err) {
      console.log("presenceSocket ERROR:", err.message);
    }

    /**
     * DISCONNECT
     */
    socket.on("disconnect", (reason) => {
      console.log("=================================");
      console.log("Socket Disconnected");
      console.log("User:", socket.user.id);
      console.log("Reason:", reason);
      console.log("=================================");
    });
  });
};

export default initSocket;