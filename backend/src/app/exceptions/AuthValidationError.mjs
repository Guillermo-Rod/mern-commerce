import ResponseService from "../utils/ResponseService.mjs";

class AuthValidationError extends Error {
    constructor(message, parameters = []) {
        super();
        this.name = 'AuthValidationError';
        this.statusCode = ResponseService.BAD_REQUEST_CODE;
        this.message = message;
        this.requiredParameters = parameters;
    }

    static missingRequiredParameters(...params) {
        return new AuthValidationError('Missing required parameters', params);
    }

    static invalidParameterFormat(parameter) {
        return new AuthValidationError(`Invalid ${parameter} format!`, [parameter]);
    }
    
    static wrongPassword() {
        return new AuthValidationError(`Wrong password!`, ['password']);
    }
}
 
export default AuthValidationError;