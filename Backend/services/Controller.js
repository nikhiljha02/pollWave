import * as authServices from "./auth/service.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerController = async (req, res) => {
  const user = await authServices.register(req.body);
  res.cookie("AccessTokens", user.accessToken, {
    httpOnly: true, // prevents JS access (important security)
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
  });
  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true, // prevents JS access (important security)
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
  });
  ApiResponse.created(res, "Registration Completed", user);
};
const loginController = async (req, res) => {
  const user = await authServices.login(req.body);

  res.cookie("AccessTokens", user.accessToken, {
    httpOnly: true, // prevents JS access (important security)
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
  });
  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true, // prevents JS access (important security)
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
  });
  ApiResponse.created(res, "login successful", user);
};

const logout = async (req, res) => {
  const signOff = await authServices.logout(req.user.email);
  res.clearCookie("AccessTokens", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true, // prevents JS access (important security)
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
  });
  ApiResponse.ok(res, "log out");
};

const userProfile = async (req, res) => {
  const user = await authServices.user(req.user.email);
  ApiResponse.ok(res, "userData", user);
};

const ipAddress = async (req, res) => {
  const ipAdd = await authServices.ipConfig(req);
  res.json(ipAdd);
};

export { registerController, loginController, ipAddress, logout, userProfile };
