// utils/generateOtp.js
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const getExpiryTime = (minutes = 10) => {
  return new Date(Date.now() + minutes * 60000); // expires in 10 minutes
};
