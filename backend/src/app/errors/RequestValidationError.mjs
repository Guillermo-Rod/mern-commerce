import { getClientErrorStructure } from "../utils/clientErrorStructure.mjs";

class RequestValidationError extends Error {
    constructor(validationObject) {
        super();
        this.name = 'RequestValidationError';
        this.message = 'Request validation fails';
        this.parameters = [];
        this.constructor_reference = { ref: 'constructor' };
        this.validationObject = validationObject;
    }

    toJson() {
        const errors = {};

        for (const input in this.validationObject.errors.all()) {
            errors[input] = this.validationObject.errors.first(input);
        }

        return getClientErrorStructure({
            error_name: this.name,
            error_message: this.message,
            errors: errors,
        });
    }
}
 
export default RequestValidationError;