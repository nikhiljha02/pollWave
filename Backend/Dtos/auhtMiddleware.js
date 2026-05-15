import APiError from "../utils/api-error.js";
import { verifyAccessToken } from "../jwt/jwt.js";

const authenticate = (req, res, next) => {
  console.log(req.body);

  const token = req.cookies?.AccessTokens;

  if (!token) throw APiError.unAuthorized("Not Authenticated");

  const decoded = verifyAccessToken(token);

  if (decoded.status === "error") {
    throw APiError.unAuthorized(decoded.message, decoded.name);
  }

  req.user = decoded; // 👈 HERE ID comes from token
  next();
};

export default authenticate;
