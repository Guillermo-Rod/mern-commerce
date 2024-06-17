class ModelAlreadyExists extends Error {
    constructor(model) {
        super();
        this.name = "ModelAlreadyExists";
        this.statusCode = 400;
        this.responseType = "json";
        this.message = `${model} already exists`;
    }
}

export default ModelAlreadyExists;