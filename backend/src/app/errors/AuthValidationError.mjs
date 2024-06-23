import { buildJsonClientError } from "../utils/clientErrorStructure.mjs";

class AuthValidationError extends Error {
    static AUTH_VALIDATION_ERROR = { ref: 'constructor', message: 'validation error!' }
    static WRONG_PASSWORD_ERROR = { ref: 'wrongPassword', message: 'is wrong!'};

    constructor(message = 'Authentication failed!', parameters = [], constructorReference) {
        super();
        this.name = 'AuthValidationError';
        this.message = message;
        this.parameters = parameters;
        this.constructor_reference = constructorReference || AuthValidationError.AUTH_VALIDATION_ERROR;
    }
    
    static wrongPassword() {
        return new AuthValidationError(`Wrong password!`, ['password'], AuthValidationError.WRONG_PASSWORD_ERROR);
    }

    toJson() {
        return buildJsonClientError(this);
    }
}
 
export default AuthValidationError;