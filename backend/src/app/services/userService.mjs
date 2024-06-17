import ModelAlreadyExists from "../exceptions/ModelAlreadyExistsException.mjs";
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
        throw new ModelAlreadyExists('User');
    }

    const user = new User({name, last_name, phone, email, password});
    
    await user.save();

    return user;
}