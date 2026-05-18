// import jwt from "jsonwebtoken";

// const generateRefreshToken = (payload) => {
//   return jwt.sign(
//     payload,
//     process.env.JWT_REFRESH_SECRET,
//     {
//       expiresIn: "30d"
//     }
//   );
// };

// export default generateRefreshToken;

import jwt from "jsonwebtoken";

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

export default generateRefreshToken;
