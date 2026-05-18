import { io } from "socket.io-client";

const URL = "http://localhost:5000";
const EVENT_ID = "6a045751b399829ec312cc4d";

const admin = io(URL, {
  auth: {
    token: "ADMIN_TOKEN"
  },
  transports: ["websocket"],
});

const user = io(URL, {
  auth: {
    token: "USER_TOKEN"
  },
  transports: ["websocket"],
});

/* USER */
user.on("connect", () => {
  console.log("USER connected");

  user.emit("join-event", EVENT_ID);
});

user.on("new-announcement", (data) => {
  console.log("🔥 USER RECEIVED:", data);
});

/* ADMIN */
admin.on("connect", () => {
  console.log("ADMIN connected");

  admin.emit("join-event", EVENT_ID);

  setTimeout(() => {
    console.log("ADMIN sending announcement...");

    admin.emit("announcement", {
      eventId: EVENT_ID,
      title: "Test Announcement",
      message: "Hello world",
    });
  }, 1500);
});