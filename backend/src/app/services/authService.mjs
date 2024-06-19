import 'dotenv/config';
import AuthValidationError from "../exceptions/AuthValidationError.mjs";
import ModelAlreadyExistsError from "../exceptions/ModelAlreadyExistsError.mjs";
import ModelNotFoundError from "../exceptions/ModelNotFoundError.mjs";
import User from "../models/User.mjs";
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    // Make Auth Token
    const token = jwt.sign(
                        { 
                            id: user._id, 
                            email: user.email,
                            iss: process.env.APP.APP_URL,
                            iat: Math.floor(Date.now() / 1000),
                            exp: '1h',
                        }, 
                        process.env.APP_KEY, 
                        {expiresIn: '1h'}
                    );

    return token;
}