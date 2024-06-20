import { signupUser, loginUser, refreshUserTokens } from "../../services/authService.mjs";
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
        }else if (error.name === 'ModelAlreadyExistsError') {
            response.conflict(error.message, {exception_name: error.name});
        }else {
            response.internalServerError(error.message);
        }
    }
}

export const login = async (req, res) => {
    const response = new ResponseService(res);
    
    const { email, password } = req.body;

    try {
        const {token, refresh_token} = await loginUser(email, password);
        response.ok('User authenticated successfully!', {token, refresh_token});
    } catch (error) {
        if (error.name === 'ModelNotFoundError') {
            response.notFound('User');
        }else if (error.name === 'AuthValidationError') {
            response.badRequest('Validation error', {
                exception_name: error.name,
                error: error.message
            })
        }else {
            response.internalServerError(error.message);
        }
    }
}

export const refreshAuthToken = async(req, res) => {
    const response = new ResponseService(res);
    
    try {
        const {token, refresh_token, refresh_token_was_renewed} = await refreshUserTokens(req.body.refresh_token);
        const message = refresh_token_was_renewed ? 'Token and Refresh Token were renewed!' : 'Token was renewed!'; 

        response.ok(message, {token, refresh_token});
    } catch (error) {
        if (error.name === 'AuthValidationError') {
            response.badRequest('Validation error', {
                exception_name: error.name,
                error: error.message,
                requiredParameters: error.requiredParameters
            });
        }else if (error.name === 'ModelNotFoundError') {
            response.notFound('RefreshToken');
        }else {
            response.internalServerError(error.message);
        }    
    }
}