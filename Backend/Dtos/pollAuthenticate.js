import APiError from "../utils/api-error.js";
import pollQuestionSChema from "../Model/pollSchema.js";
import { verifyAccessToken } from "../jwt/jwt.js";
import Client from "../Model/client.js";

const pollAuthenticate = async (req, res, next) => {
 
  let id = req.body.id;
  let token = req.cookies?.AccessTokens;
  const decoded = verifyAccessToken(token);
 

  let checkAuth = await pollQuestionSChema.findById(id);

  if (!checkAuth.allowAnonymous) {
    let user = await Client.findById(decoded.id);
  
    if (!user) {
      throw APiError.unAuthorized("unAuthorized" );
    }
  ;
  }
  next();
};

// 👈 HERE ID comes from token
// };/

export default pollAuthenticate;
