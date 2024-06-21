import ModelAlreadyExistsError from "../exceptions/ModelAlreadyExistsError.mjs";
import ModelNotFoundError from "../exceptions/ModelNotFoundError.mjs";
import ParametersError from "../exceptions/ParametersError.mjs";
import User from "../models/User.mjs";

/**
 * Store User in Database
 * 
 * @param user Object
 * @return user Object
 */
export async function createUser ({name, last_name, phone, email, password}) {
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new ModelAlreadyExistsError('User');
    }

    const user = new User({name, last_name, phone, email, password});
    
    await user.save();

    return user;
}

export async function getUser (userId) {

    if (! userId) throw ParametersError.missingRequired('userId');

    const user = await User.findOne({_id: userId});

    if (! user) throw new ModelNotFoundError('User');

    return user;
}