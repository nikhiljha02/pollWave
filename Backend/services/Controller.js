import * as authServices from "./auth/service.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerController = async (req, res) => {
  const user = await authServices.register(req.body);
  ApiResponse.created(res, "Registration Completed", user);
};
const loginController = async (req, res) => {
  const user = await authServices.login(req.body);
  ApiResponse.created(res, "login successful", user);
};

const logout = async (req, res) => {
  const signOff = await authServices.logout(req.user.id);
  ApiResponse.ok(res, "log out");
};

const ipAddress = async (req, res) => {
  const ipAdd = await authServices.ipConfig(req);
  res.json(ipAdd);
};

export { registerController, loginController, ipAddress, logout };
