const sendOTPEmail = async (email, otp) => {
  console.log(`
====================================
OTP SENT
Email: ${email}
OTP: ${otp}
====================================
  `);
};

export default sendOTPEmail;