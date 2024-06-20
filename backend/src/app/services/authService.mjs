import AuthValidationError from "../exceptions/AuthValidationError.mjs";
import ModelAlreadyExistsError from "../exceptions/ModelAlreadyExistsError.mjs";
import ModelNotFoundError from "../exceptions/ModelNotFoundError.mjs";
import User from "../models/User.mjs";
import RefreshToken from "../models/RefreshToken.mjs";
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jWTokenRequiresRenew, newJWToken } from "../utils/jwtHelpers.mjs";
import authConfig from '../config/auth.mjs';

/**
 * Store User in Database
 * 
 * @param user Object
 * @return user Object
 */
export async function signupUser ({name, last_name, phone, email, password}) {
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new ModelAlreadyExistsError('User');
    }

    const user = new User({name, last_name, phone, email, password});
    
    await user.save();

    return user;
}

export async function loginUser (email, password) {
    
    if (! email || ! password) throw AuthValidationError.missingRequiredParameters('email', 'password');
    if (! validator.isEmail(email)) throw AuthValidationError.invalidParameterFormat('email', email); 
    
    const user = await User.findOne({ email });
    if (! user) throw new ModelNotFoundError('User');

    const isMatch = await bcrypt.compare(password, user.password);
    if (! isMatch) throw AuthValidationError.wrongPassword();
    
    const signature = {user_id: user._id, user_email: user.email};

    const tokens = {
        token : newJWToken(signature, authConfig.token.secret_key, authConfig.token.expires_in),
        refresh_token: newJWToken(signature, authConfig.refresh_token.secret_key, authConfig.refresh_token.expires_in)
    };

    // Creates a new refresh model in the database
    const newRefreshModel = new RefreshToken({
        user_id: user._id,
        token: tokens.refresh_token
    });

    await newRefreshModel.save();

    // Returns the tokens
    return tokens;
}

/**
 * 
 * @param {*} refreshToken
 * @throws AuthValidationError | ModelNotFoundError | JsonWebTokenError
 * @returns 
 */
export async function refreshUserTokens(refreshToken) {
    if (! refreshToken) throw AuthValidationError.missingRequiredParameters('refresh_token');

    // Evaluates the refresh token format
    // If fails throws an JsonWebTokenError
    try {
        var refreshTokenSignature = jwt.verify(refreshToken, authConfig.refresh_token.secret_key);    
    } catch (error) {
        if (error.name === 'JsonWebTokenError') throw AuthValidationError.invalidParameterFormat('refresh_token');
        throw error;
    }

    // Try to find in database
    const existingFreshToken = await RefreshToken.findOne({token: refreshToken});
    if (! existingFreshToken) throw new ModelNotFoundError('RefreshToken');
    
    // On success verification build the signature 
    const signature = {user_id: refreshTokenSignature.user_id, user_email: refreshTokenSignature.user_email};
    const refreshTokenRequiresRenew = jWTokenRequiresRenew(refreshTokenSignature, authConfig.refresh_token.refresh_threshold);

    // Evaluates if the actual refreshToken needs to be renewed
    if (refreshTokenRequiresRenew) {
        // Overwrite refresh token value
        refreshToken = newJWToken(signature, authConfig.refresh_token.secret_key, authConfig.refresh_token.expires_in);
        
        // Creates a new refresh model in the database
        const newRefreshModel = new RefreshToken({
            user_id: refreshTokenSignature.user_id,
            token: refreshToken
        });
        await newRefreshModel.save();
    }

    // Return the tokens
    return {
        token: newJWToken(signature, authConfig.token.secret_key, authConfig.token.expires_in),
        refresh_token: refreshToken,
        refresh_token_was_renewed: refreshTokenRequiresRenew
    };
}
  