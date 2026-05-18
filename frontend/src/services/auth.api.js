import api from "./api";

/**
 * LOGIN
 */
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/**
 * REGISTER
 */
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

/**
 * GET PROFILE
 */
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};