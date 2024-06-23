import { buildJsonClientError } from "../utils/clientErrorStructure.mjs";

class ModelAlreadyExistsError extends Error {
    constructor(model) {
        super();
        this.name = 'ModelAlreadyExistsError';
        this.message = `${model} Already Exists!`;
        this.parameters = [];
        this.constructor_reference = { ref: 'constructor' };
    }

    toJson() {
        return buildJsonClientError(this);
    }
}

export default ModelAlreadyExistsError;