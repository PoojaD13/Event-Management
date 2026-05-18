import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../src/models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.create({
  name: "Admin",
  email: "admin@test.com",
  password: "password123",
  role: "admin"
});

console.log("Seed complete");

process.exit();