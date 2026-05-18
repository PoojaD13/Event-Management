// // import Attendance from "../models/Attendance.js";

// // export const markAttendance = async (req, res) => {
// //   const attendance = await Attendance.create({
// //     user: req.user.id,
// //     event: req.body.eventId
// //   });

// //   res.json({
// //     success: true,
// //     message: "Attendance marked",
// //     data: attendance
// //   });
// // };

// import { markAttendanceService } from "../services/attendance.service.js";

// /**
//  * MARK ATTENDANCE
//  */
// export const markAttendance = async (req, res) => {
//   try {
//     const { eventId } = req.body;

//     // validation
//     if (!eventId) {
//       return res.status(400).json({
//         success: false,
//         message: "eventId is required",
//       });
//     }

//     const attendance = await markAttendanceService(req.user.id, eventId);

//     res.status(201).json({
//       success: true,
//       message: "Attendance marked",
//       data: attendance,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

import { markAttendanceService } from "../services/attendance.service.js";

/**
 * SCAN QR → MARK ATTENDANCE
 */
export const markAttendance = async (req, res) => {
  try {
    const { eventId } = req.body;

    // if (!qrToken) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "QR token is required",
    //   });
    // }

    const attendance = await markAttendanceService(req.user.id, eventId);

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
