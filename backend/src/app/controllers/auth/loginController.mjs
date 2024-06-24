import { signupUser, loginUser, refreshUserTokens } from "../../services/authService.mjs";
import ResponseService from "../../utils/ResponseService.mjs";

export const signup = async (req, res, next) => {    
    try {
        const user = await signupUser(req.body);

        return ResponseService
                .newInstance(res)
                .created('user', {user});
    
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const payload = await loginUser(email, password);

        return ResponseService
                .newInstance(res)
                .ok('User authenticated successfully!', payload);

    } catch (error) {
        next(error);
    }
}

export const refreshAuthToken = async(req, res, next) => {
    try {
        const payload = await refreshUserTokens(req.body.refresh_token);
        const message = payload.refresh_token_was_renewed ? 'Token and Refresh Token were renewed!' : 'Token was renewed!'; 

        return ResponseService
                .newInstance(res)
                .ok(message, payload);

    } catch (error) {
        next(error);
    }
}