import APiError from "../utils/api-error.js";
import pollQuestionSChema from "../Model/pollSchema.js";
import { verifyAccessToken } from "../jwt/jwt.js";
import Client from "../Model/client.js";

const pollAuthenticate = async (req, res, next) => {
  // console.log(req.body);
  let id = req.body.id;
  let token = req.cookies?.AccessTokens;
  const decoded = verifyAccessToken(token);
  // console.log(decoded);

  let checkAuth = await pollQuestionSChema.findById(id);
  // console.log("check", checkAuth);
  if (!checkAuth.allowAnonymous) {
    let user = await Client.findById(decoded.id);
    // console.log(user)
    if (!user) {
      throw APiError.unAuthorized("unAuthorized" );
    }
    // throw APiError.forBidden("Poll nor for anonymous");
  }
  next();
};

// 👈 HERE ID comes from token
// };/

export default pollAuthenticate;
