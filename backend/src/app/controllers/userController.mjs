import { getUser } from "../services/userService.mjs";
import ResponseService from "../utils/ResponseService.mjs";

export async function show (req, res, next) {
    try {
        const { user_id } = req.auth_user;
        const user = await getUser(user_id);
        
        return ResponseService
                .newInstance(res)
                .ok('User information', {user});

    } catch (error) {
        next(error);
    }
}