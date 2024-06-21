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

export function jWTokenWasExpired (tokenSignature) {
    // Get the expiration time in seconds since unix time
    const expirationTimestamp = tokenSignature.exp;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    return expirationTimestamp >= currentTimeInSeconds;
}

export function jWTokenRequiresRenew(tokenSignature, refreshThreshold) {
    // Get the expiration time in seconds since unix time
    const expirationTimestamp = tokenSignature.exp;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); 
    const timeRemaining = expirationTimestamp - currentTimeInSeconds; 
    
    return timeRemaining < refreshThreshold;
}
