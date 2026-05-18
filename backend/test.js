import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDQ2NWJhNDliM2JkMTRhNTI2ODZmNyIsInJvbGUiOiJvcmdhbml6ZXIiLCJpYXQiOjE3Nzg2ODY3MDAsImV4cCI6MTc3OTI5MTUwMH0.tqDx6nMwpgItFpR_T-bnF_va8hozlgKItw2FlFo1pM8",
  },
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("join-event", "6a045751b399829ec312cc4d");

  socket.emit("send-message", {
    eventId: "6a045751b399829ec312cc4d",
    message: "Hello from test client",
  });
});

socket.on("receive-message", (data) => {
  console.log("MESSAGE:", data);
});

socket.on("new-announcement", (data) => {
  console.log("ANNOUNCEMENT:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});
