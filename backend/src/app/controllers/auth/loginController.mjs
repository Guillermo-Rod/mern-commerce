import { signupUser } from "../../services/authService.mjs";
import ResponseService from "../../utils/ResponseService.mjs";
import mapValidationErrors from "../../utils/mapValidationErrors.mjs";

export const signup = async (req, res) => {
    const response = new ResponseService(res);
    
    try {
        const user = await signupUser(req.body)
        response.created('User', {user: user})
    } catch (error) {
        if (error.name === 'ValidationError') {
            response.badRequest('Validation error', {
                exception_name: error.name,
                error: error.message, 
                errors: mapValidationErrors(error.errors),
            });
        }else if (error.name === 'ModelAlreadyExists') {
            response.conflict(error.message, {exception_name: error.name});
        }else {
            response.internalServerError(error.message);
        }
    }
}
