import ResponseService from "../utils/ResponseService.mjs";

class ModelNotFoundError extends Error {
    constructor(model) {
        super();
        this.name = "ModelNotFoundError";
        this.statusCode = ResponseService.NOT_FOUND_CODE;
        this.message = `${model} Not Found!`;
    }
}

export default ModelNotFoundError;