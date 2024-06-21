class ParametersError extends Error {
    constructor(message = 'Parameters error!', parameters = []) {
        this.super();
        this.name = 'ParametersError';
        this.message = message;
        this.parameters = parameters;
    }

    static missingRequired(...params) {
        return new ParametersError('Missing required parameters', params);
    }

    static invalidFormat(parameter) {
        return new ParametersError(`Invalid ${parameter} format!`, [parameter]);
    }

    toJson() {
        return {
            exception_name: this.name,
            error: this.message,
            parameters: this.parameters
        };
    }
}
 
export default ParametersError;