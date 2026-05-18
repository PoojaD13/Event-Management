import {
  registerUserService,
  loginUserService,
  refreshTokenService,
  logoutService,
} from "../services/auth.service.js";

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    const result = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const result = await loginUserService(req.body);

    res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * REFRESH TOKEN
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const result = await refreshTokenService(refreshToken);

    res.json({
      success: true,
      message: "Token refreshed",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * LOGOUT
 */
export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    await logoutService(req.user.id, token);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
