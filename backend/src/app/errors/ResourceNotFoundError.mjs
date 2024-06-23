import { buildJsonClientError } from "../utils/clientErrorStructure.mjs";

class ResourceNotFoundError extends Error {
    constructor(resource) {
        super();
        this.name = 'ResourceNotFoundError';
        this.message = `${resource} Not Found!`;
        this.parameters = [];
        this.constructor_reference = { ref: 'constructor' };
    }

    toJson() {
        return buildJsonClientError(this);
    }
}

export default ResourceNotFoundError;