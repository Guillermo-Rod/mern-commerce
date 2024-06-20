import 'dotenv/config';
import jwt from "jsonwebtoken";

export function newJWToken({user_id, user_email}, secretKey, expiresIn) {
    return jwt.sign(
        { 
            user_id, 
            user_email,
            iss: process.env.APP_URL,
            iat: Math.floor(Date.now() / 1000),
        }, 
        secretKey, 
        {expiresIn}
    );
}

export function jWTokenRequiresRenew(tokenSignature, refreshThreshold) {
    // Get the expiration time in seconds since unix time
    const expirationTimestamp = tokenSignature.exp;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); 
    // Compare expiration time with the currentTime 
    const timeRemaining = expirationTimestamp - currentTimeInSeconds; 
    
    // Argument "refreshThreshold"
    // is the time umbral to determine if the token needs to be renew 
    return timeRemaining < refreshThreshold;
}
