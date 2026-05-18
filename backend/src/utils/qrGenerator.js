// // import QRCode from "qrcode";

// // const generateQRCode = async (eventId) => {
// //   const url = `http://localhost:5000/api/v1/events/${eventId}`;

// //   return QRCode.toDataURL(url);
// // };

// // export default generateQRCode;

// import QRCode from "qrcode";
// import fs from "fs";
// import path from "path";

// const generateQRCode = async (eventId) => {
//   const qrDir = path.join("uploads", "qrcodes");

//   if (!fs.existsSync(qrDir)) {
//     fs.mkdirSync(qrDir, { recursive: true });
//   }

//   const filePath = path.join(
//     qrDir,
//     `${eventId}.png`
//   );

//   const eventUrl = `http://localhost:5000/api/v1/events/${eventId}`;

//   await QRCode.toFile(filePath, eventUrl);

//   return `/uploads/qrcodes/${eventId}.png`;
// };

// export default generateQRCode;

// import jwt from "jsonwebtoken";
// import QRCode from "qrcode";

/**
 * Generate secure QR for event attendance
 */
// export const generateEventQR = async (eventId) => {
//   const token = jwt.sign(
//     {
//       eventId,
//       type: "attendance",
//     },
//     process.env.JWT_QR_SECRET,
//     {
//       expiresIn: "1d", // QR expires in 24h
//     },
//   );

//   const qrImage = await QRCode.toDataURL(token);

//   return {
//     token,
//     qrImage,
//   };
// };

// import QRCode from "qrcode";

// export const generateEventQR = async (eventId) => {
//   const qrImage = await QRCode.toDataURL(eventId.toString());

//   return {
//     token: eventId.toString(),
//     qrImage,
//   };
// };

import QRCode from "qrcode";

export const generateEventQR = async (eventId) => {
  const qrImage = await QRCode.toDataURL(eventId.toString());

  return {
    qrImage,
  };
};
