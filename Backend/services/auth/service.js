import crypto from "crypto";
import Client from "../../Model/client.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../jwt/jwt.js";

const hashTokenProcess = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const ipConfig = async (req) => {
  console.log(req);
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (ip.includes("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }
  return ip;
};

const register = async ({ name, email, password }) => {
  let existingUser = await Client.findOne({ email });
  if (existingUser) {
    throw APiError.conflict("Email Already exists, User already registered");
  }

  let accessToken = generateAccessToken({ name: name, email: email });
  let refreshToken = generateRefreshToken({ name: name, email: email });

  let hashToken = hashTokenProcess(refreshToken);
  console.log(hashToken);
  // console.log(refreshToken == hashRefreshToken);

  let registerUser = await Client.create({
    name,
    email,
    password,
    login: true,
    refreshToken: hashToken,
  });

  const userObj = registerUser.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { userObj, accessToken: accessToken, refreshToken: refreshToken };
};

const login = async ({ email, password }) => {
  let loginUser = await Client.findOne({ email }).select("+password");
  if (!loginUser) {
    throw APiError.notFound("user with this email is not Registered");
  }
  let checkPass = await loginUser.comparePassword(password);
  if (!checkPass) {
    throw APiError.unAuthorized("Email or password is incorrect");
  }

  let accessToken = generateAccessToken({ id: loginUser._id, email: email });
  let refreshToken = generateRefreshToken({ id: loginUser._id, email: email });

  let hashToken = hashTokenProcess(refreshToken);

  loginUser.refreshToken = hashToken;

  await loginUser.save({ validateBeforeSave: false });

  const userObject = loginUser.toObject();
  delete userObject.password;
  delete userObject.refreshToken;

  return { user: userObject, accessToken, refreshToken };
};

const logout = async (userId) => {
  let user = await Client.findById(userId);
  if (!user) {
    throw APiError.notFound("User not found");
  }
  user.refreshToken = null;
  user.login = false;
  await user.save({ validateBeforeSave: false });
};
export { ipConfig, register, login, logout };
