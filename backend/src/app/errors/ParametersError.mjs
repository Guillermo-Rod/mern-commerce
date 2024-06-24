import { buildJsonClientError } from "../utils/clientErrorStructure.mjs";

class ParametersError extends Error {
    static PARAMETER_ERROR = { ref: 'constructor', message: 'error!' }
    static REQUIRED_PARAMETER = { ref: 'missingRequired', message: 'is required!'};
    static INVALID_FORMAT_PARAMETER = { ref: 'invalidFormat', message: 'is not valid!'};

    constructor(message = 'Parameters error!', parameters = [], constructorReference) {
        super();
        this.name = 'ParametersError';
        this.message = message;
        this.parameters = parameters;
        this.constructor_reference = constructorReference || ParametersError.PARAMETER_ERROR;
    }

    static missingRequired(...params) {
        return new ParametersError('Missing required parameters', params, ParametersError.REQUIRED_PARAMETER);
    }

    static invalidFormat(parameter) {
        return new ParametersError(`Invalid ${parameter} format!`, [parameter], ParametersError.INVALID_FORMAT_PARAMETER);
    }

    excludeExisting(exclude) {
        for (const key in exclude) {
            if (exclude[key]) {
                this.parameters = this.parameters.filter(paramName => paramName != key);
            }
        }

        return this;
    }

    toJson() {
        return buildJsonClientError(this);
    }
}
 
export default ParametersError;