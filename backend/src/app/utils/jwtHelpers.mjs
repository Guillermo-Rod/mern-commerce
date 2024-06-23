import 'dotenv/config';
import jwt from "jsonwebtoken";
import authConfig from '../config/auth.mjs';

export function newJWToken(userId, userEmail) {
    return jwt.sign(
        { 
            user_id: userId, 
            user_email: userEmail,
            iss: process.env.APP_URL,
            iat: Math.floor(Date.now() / 1000),
        }, 
        authConfig.token.secret_key, 
        {
            expiresIn: authConfig.token.expires_in
        }
    );
}

export function newJWTRefreshToken(userId, userEmail) {
    return jwt.sign(
        { 
            user_id: userId, 
            user_email: userEmail,
            iss: process.env.APP_URL,
            iat: Math.floor(Date.now() / 1000),
        }, 
        authConfig.refresh_token.secret_key, 
        {
            expiresIn: authConfig.refresh_token.expires_in 
        }
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
