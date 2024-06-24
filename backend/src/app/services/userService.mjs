import ResourceNotFoundError from "../errors/ResourceNotFoundError.mjs";
import User from "../models/User.mjs";
import validateRequest from "../utils/ValidateRequest.mjs";

/**
 * Store User in Database
 * 
 * @param user Object
 * @return user Object
 */
export async function createUser ({name, last_name, phone, email, password}) {
    await validateRequest.validateAsync({
        request: {name, last_name, phone, email, password},
        rules: {
            name: 'required',
            last_name: 'required',
            phone: 'phone:nullable',
            email: ['required', 'email', { unique: [User, 'email'] }],
            password: 'required'
        }
    });
    
    const user = new User({name, last_name, phone, email, password});  
    await user.save();
    return user;
}

export async function getUser (userId) {

    validateRequest.validate({user_id: userId}, {
        user_id: 'required',
    });

    const user = await User.findOne({_id: userId});

    if (! user) throw new ResourceNotFoundError('User');

    return user;
}