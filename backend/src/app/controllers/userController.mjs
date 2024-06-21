import { getUser } from "../services/userService.mjs";
import ResponseService from "../utils/ResponseService.mjs";

export async function show (req, res) {
    const { user_id } = req.auth_user;
    const response = new ResponseService(res);

    try {
        const user = await getUser(user_id);
        response.ok('User information', {user});
    } catch (error) {
        if (error.name === 'ModelNotFoundError') {
            response.notFound('User');
        }else if (error.name === 'ParametersError') {
            response.badRequest('Parameters error', error.toJson())
        }else {
            response.internalServerError(error.message);
        }
    }
}