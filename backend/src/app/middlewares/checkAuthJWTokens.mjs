import jwt from "jsonwebtoken"; 
import { middlewares } from "../config/middlewares.mjs";
import auth from "../config/auth.mjs";

export default function (req, res, next) {
  const excludedPaths = middlewares.jwt_auth.excluded_paths;

  // Skip route validation
  if (excludedPaths.includes(req.path)) return next();

  // Get authentication header
  const authHeader = req.headers.authorization;

  var token;

  if (authHeader) {
    token = authHeader.split(' ')[1];
  }

  jwt.verify(token, auth.token.secret_key, (err, decodedUserSignature) => {
    // Send to error handler middleware
    if (err) return next(err); 

    // Put on req
    req.auth_user = decodedUserSignature;
    req.jwt_auth = true;
    next();
  });
}
