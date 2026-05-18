import User from "../models/User.js";

export const createUser = async (payload) => {
  return User.create(payload);
};

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};