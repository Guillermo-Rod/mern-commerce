import jwt from "jsonwebtoken"; 
import { middlewares } from "../config/middlewares.mjs";
import ResponseService from "../utils/ResponseService.mjs";
import auth from "../config/auth.mjs";

export default function (req, res, next) {
  const excludedPaths = middlewares.jwt_auth.excluded_paths;
  const response = new ResponseService(res);

  // Skip route validation
  if (excludedPaths.includes(req.path)) return next();

  // Get authentication header
  const authHeader = req.headers.authorization;
  if (! authHeader) return response.unauthorized();

  const token = authHeader.split(' ')[1];

  jwt.verify(token, auth.token.secret_key, (err, decodedUserSignature) => {
    if (err) {
      if (err.name =='TokenExpiredError') return response.unauthorized({error: err.message})
      return response.forbidden({error: err.message});
    }
    
    req.auth_user = decodedUserSignature;
    req.jwt_auth = true;
    next();
  });
}
