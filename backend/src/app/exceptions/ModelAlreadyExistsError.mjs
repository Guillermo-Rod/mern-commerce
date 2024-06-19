class ModelAlreadyExistsError extends Error {
    constructor(model) {
        super();
        this.name = "ModelAlreadyExistsError";
        this.statusCode = 400;
        this.responseType = "json";
        this.message = `${model} already exists`;
    }
}

export default ModelAlreadyExistsError;