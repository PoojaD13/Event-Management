// // import { io } from "socket.io-client";

// // const URL = "http://localhost:5000";

// // // simulate admin + user
// // const admin = io(URL, {
// //   auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDRiNzQ4MTNhMmUxNTYxN2M3OWJjMiIsImlhdCI6MTc3ODY5Mzk2MCwiZXhwIjoxNzgxMjg1OTYwfQ.b3amn6RrHMs-wDGjYkX9pQLZdrUkC3jgScRy5DI1mvU" }
// // });

// // const user = io(URL, {
// //   auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDRjNTdkOTAxMTY4ZTU2MzM0NjY5NCIsImlhdCI6MTc3ODY5NzU5NywiZXhwIjoxNzgxMjg5NTk3fQ.dBq32eYZwtXefVKEUpeqTduEsjlO8kr8dEn0JWA4dhg" }
// // });

// // const EVENT_ID = "6a045751b399829ec312cc4d";

// // // USER joins room
// // user.on("connect", () => {
// //   console.log("User connected");

// //   user.emit("join-event", "6a045751b399829ec312cc4d");
// // });

// // // ADMIN joins room
// // admin.on("connect", () => {
// //   console.log("Admin connected");

// //   admin.emit("join-event", EVENT_ID);

// //   // send announcement after join
// //   setTimeout(() => {
// //     admin.emit("announcement", {
// //       eventId: "6a045751b399829ec312cc4d",
// //       title: "Test Announcement",
// //       message: "Automation test message"
// //     });

// //     console.log("Announcement sent");
// //   }, 2000);
// // });

// // // USER receives announcement
// // user.on("new-announcement", (data) => {
// //   console.log("USER RECEIVED:", data);
// // });

// // // ADMIN receives (optional debug)
// // admin.on("new-announcement", (data) => {
// //   console.log("ADMIN RECEIVED:", data);
// // });

// import { io } from "socket.io-client";

// const URL = "http://localhost:5000";


// const admin = io(URL, {
//   auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDRiNzQ4MTNhMmUxNTYxN2M3OWJjMiIsInJvbGUiOiJvcmdhbml6ZXIiLCJpYXQiOjE3Nzg2OTM5ODEsImV4cCI6MTc3OTI5ODc4MX0.eGoBbdD16NQMmzDGF0verFymd_4Px9FhAio8Y9J9E6o" },
//   transports: ["websocket"],
//   forceNew: true,
//   reconnection: false,
//   timeout: 10000,
// });

// const user = io(URL, {
//   auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDRjNTdkOTAxMTY4ZTU2MzM0NjY5NCIsInJvbGUiOiJwYXJ0aWNpcGFudCIsImlhdCI6MTc3ODY5ODE0NSwiZXhwIjoxNzc5MzAyOTQ1fQ.W6h_ckRjpvsj3ktaiuwcQFBQOq1QCVlzOHtaz72fZec" },
//   transports: ["websocket"],
//   forceNew: true,
//   reconnection: false,
//   timeout: 10000,
// });

// const EVENT_ID = "6a045751b399829ec312cc4d";

// // USER
// user.on("connect", () => {
//   console.log("USER connected");

//   user.emit("join-event", EVENT_ID);
// });

// // ADMIN
// admin.on("connect", () => {
//   console.log("ADMIN connected");

//   admin.emit("join-event", EVENT_ID);

//   setTimeout(() => {
//     console.log("ADMIN sending announcement...");

//     admin.emit("announcement", {
//       eventId: EVENT_ID,
//       title: "Test Announcement",
//       message: "Automation test message",
//     });
//   }, 2000);
// });

// // USER RECEIVES
// user.on("new-announcement", (data) => {
//   console.log("🔥 USER RECEIVED:", data);
// });

// // ADMIN RECEIVES (debug)
// admin.on("new-announcement", (data) => {
//   console.log("ADMIN RECEIVED:", data);
// });


// admin.on("connect", () => {
//   console.log("ADMIN connected");
// });

// admin.on("connect_error", (err) => {
//   console.log("ADMIN ERROR:", err.message);
// });

// user.on("connect", () => {
//   console.log("USER connected");
// });

// user.on("connect_error", (err) => {
//   console.log("USER ERROR:", err.message);
// });
// // KEEP ALIVE (IMPORTANT)


import { io } from "socket.io-client";

const URL = "http://localhost:5000";
const EVENT_ID = "6a04ba7ffbed7e08c44945e6";

// 🔐 Admin socket
const admin = io(URL, {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDRiNzQ4MTNhMmUxNTYxN2M3OWJjMiIsInJvbGUiOiJvcmdhbml6ZXIiLCJpYXQiOjE3Nzg2OTM5ODEsImV4cCI6MTc3OTI5ODc4MX0.eGoBbdD16NQMmzDGF0verFymd_4Px9FhAio8Y9J9E6o"
  },
  transports: ["websocket"],
  forceNew: true,
  reconnection: false,
  timeout: 10000,
});

// 👤 User socket
const user = io(URL, {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDRjNTdkOTAxMTY4ZTU2MzM0NjY5NCIsInJvbGUiOiJwYXJ0aWNpcGFudCIsImlhdCI6MTc3ODY5ODE0NSwiZXhwIjoxNzc5MzAyOTQ1fQ.W6h_ckRjpvsj3ktaiuwcQFBQOq1QCVlzOHtaz72fZec"
  },
  transports: ["websocket"],
  forceNew: true,
  reconnection: false,
  timeout: 10000,
});

/* ---------------- USER ---------------- */

user.on("connect", () => {
  console.log("USER connected");

  user.emit("join-event", EVENT_ID);
});

user.on("new-announcement", (data) => {
  console.log("🔥 USER RECEIVED:", data);
});

user.on("connect_error", (err) => {
  console.log("USER ERROR:", err.message);
});

/* ---------------- ADMIN ---------------- */

admin.on("connect", () => {
  console.log("ADMIN connected");

  admin.emit("join-event", EVENT_ID, (res) => {
    console.log("ADMIN joined room:", res);

    console.log("ADMIN sending announcement...");

    admin.emit("announcement", {
      eventId: EVENT_ID,
      title: "Test Announcement",
      message: "Automation test message",
    });
  });
});

admin.on("connect_error", (err) => {
  console.log("ADMIN ERROR:", err.message);
});

admin.on("new-announcement", (data) => {
  console.log("ADMIN RECEIVED:", data);
});

/* ---------------- KEEP ALIVE ---------------- */

setTimeout(() => {
  console.log("Test finished (keeping sockets alive for logs)");
}, 15000);