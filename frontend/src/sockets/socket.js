// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   autoConnect: false,
//   auth: {
//     token: localStorage.getItem("token"),
//   },
// });

// export const connectSocket = () => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     socket.auth = { token };
//     socket.connect();
//   }
// };

// export const disconnectSocket = () => {
//   socket.disconnect();
// };

// export default socket;

import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export const connectSocket = () => {
  const token = localStorage.getItem("token");

  if (!token) return;

  socket.auth = { token };
  socket.connect();
};

export default socket;