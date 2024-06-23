import { buildJsonClientError } from "../utils/clientErrorStructure.mjs";

class ForbiddenError extends Error {
    constructor() {
        super();
        this.name = 'ForbiddenError';
        this.message = `Forbidden, Access Denied!`;
        this.parameters = [];
        this.constructor_reference = { ref: 'constructor' };
    }

    toJson() {
        return buildJsonClientError(this);
    }
}
 
export default ForbiddenError;