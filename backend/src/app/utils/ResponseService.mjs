class ResponseService {
    
    constructor(response) {
        this.response = response;
    }

    addToJson(data, json) {
        if (data !== undefined) json.data = data;
        return json;
    }

    // 200 OK
    // Action was successfully executed
    ok (message = 'OK', data) {
        const statusCode = 200;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }

    // 201 Resource Created
    // Action was successfully executed and resource was created
    created(model, data) {
        const statusCode = 201;
        const message = `${model} registered successfully`;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }

    // 204 No Content
    // Action was successfully executed but not exists content to return
    noContent() {
        this.response.status(204).send({});
    }

    // 304 Not Modified
    // The info has not been changed since the latest request
    notModified() {
        this.response.status(304).send({}); 
    }

    // 400 Bad Request
    // The request is not valid or is malformed
    badRequest(reason, data) {
        const statusCode = 400;
        const message = `Bad Request : ${reason}`;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }

    // 401 Unauthorized
    // User not authenticated
    unauthorized(data) {
        const statusCode = 401;
        const message = 'Authentication is required';
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }

    // 403 Forbidden
    // User authenticated but without permissions
    forbidden(data) {
        const statusCode = 403;
        const message = 'User authenticated but without permissions';
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }

    // 404 Not Found
    // The requested resource not found
    notFound(resource, data) {
        const statusCode = 404;
        const message = `Not Found : ${resource}`;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }

    // 409 Conflict
    // The request was not completed because there are an conflict with his current state 
    conflict(reason, data) {
        const statusCode = 409;
        const message = `Conflict : ${reason}`;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }

    // 500 Server error
    // Code error, server error
    internalServerError(reason, data) {
        const statusCode = 500;
        const message = `Server error : ${reason}`;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }

    // 503 Service Unavailable
    // The server is not available to handle the request
    serviceUnavailable(reason, data) {
        const statusCode = 503;
        const message = `Service Unavailable : ${reason}`;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode}));
    }
}
 
export default ResponseService;