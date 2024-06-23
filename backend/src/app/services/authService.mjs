import AuthValidationError from "../errors/AuthValidationError.mjs";
import ModelAlreadyExistsError from "../errors/ModelAlreadyExistsError.mjs";
import ResourceNotFoundError from "../errors/ResourceNotFoundError.mjs";
import User from "../models/User.mjs";
import RefreshToken from "../models/RefreshToken.mjs";
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jWTokenRequiresRenew, newJWToken, newJWTRefreshToken } from "../utils/jwtHelpers.mjs";
import authConfig from '../config/auth.mjs';
import ParametersError from "../errors/ParametersError.mjs";
import { createRefreshToken } from "../services/refreshTokenService.mjs";

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
    if (! email || ! password) throw ParametersError.missingRequired('email', 'password');
    if (! validator.isEmail(email)) throw ParametersError.invalidFormat('email'); 
    
    const user = await User.findOne({ email });
    if (! user) throw new ResourceNotFoundError('User');

    const isMatch = await bcrypt.compare(password, user.password);
    if (! isMatch) throw AuthValidationError.wrongPassword();

    const authPayload = {
        user_id: user._id,
        token : newJWToken(user._id, user.email),
        refresh_token: newJWTRefreshToken(user._id, user.email),
        token_expires_in: authConfig.token.expires_in,
        refresh_token_expires_in: authConfig.refresh_token.expires_in,
    };

    await createRefreshToken(user._id, authPayload.refresh_token);

    return authPayload;
}

/**
 * 
 * @param {*} refreshToken
 * @throws AuthValidationError | ResourceNotFoundError | JsonWebTokenError
 * @returns 
 */
export async function refreshUserTokens(refreshToken) {
    var refreshTokenSignature = jwt.verify(refreshToken, authConfig.refresh_token.secret_key);

    // Try to find in database
    const existingFreshToken = await RefreshToken.findOne({token: refreshToken});
    if (! existingFreshToken) throw new ResourceNotFoundError('RefreshToken');
    
    const userInformation = {
        user_id: refreshTokenSignature.user_id, 
        user_email: refreshTokenSignature.user_email
    };

    const refreshTokenRequiresRenew = jWTokenRequiresRenew(refreshTokenSignature, authConfig.refresh_token.refresh_threshold);

    // Evaluates if the actual refreshToken needs to be renewed
    if (refreshTokenRequiresRenew) {
        // Overwrite refresh token value
        refreshToken = newJWTRefreshToken(userInformation.user_id, userInformation.user_email);

        await createRefreshToken(refreshTokenSignature.user_id, refreshToken);
    }

    const authPayload = {
        user_id: signature.user_id,
        token: newJWToken(userInformation.user_id, userInformation.user_email),
        refresh_token: refreshToken,
        refresh_token_was_renewed: refreshTokenRequiresRenew,
        token_expires_in: authConfig.token.expires_in,
    };

    // Add the expires_in of refresh_token
    if (authPayload.refresh_token_was_renewed) {
        authPayload.refresh_token_expires_in = authConfig.refresh_token.expires_in;
    }

    return authPayload;
}
  