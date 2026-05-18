import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
  {
    email: String,

    otp: String,

    expiresAt: Date
  },
  { timestamps: true }
);

export default mongoose.model(
  "Verification",
  verificationSchema
);