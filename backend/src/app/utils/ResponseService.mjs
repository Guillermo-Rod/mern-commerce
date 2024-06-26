class ResponseService {
    static OK_CODE = 200;
    static RESOURCE_CREATED_CODE = 201;
    static NO_CONTENT_CODE = 204;
    static NOT_MODIFIED_CODE = 304;
    static BAD_REQUEST_CODE = 400;
    static UNAUTHORIZED_CODE = 401;
    static FORBIDDEN_CODE = 403;
    static NOT_FOUND_CODE = 404;
    static CONFLICT_CODE = 409;
    static INTERNAL_ERROR_CODE = 500;
    static SERVICE_UNAVAILABLE_CODE = 503;

    constructor(response) {
        this.response = response;
    }

    static newInstance(res) {
        return new ResponseService(res);
    }

    addToJson(data, json) {
        if (data !== undefined) json.data = data;
        return json;
    }

    // 200 OK
    // Action was successfully executed
    ok (message = 'OK', data) {
        const statusCode = ResponseService.OK_CODE;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'ok'}));
    }

    // 201 Resource Created
    // Action was successfully executed and resource was created
    created(resource, data) {
        const statusCode = ResponseService.RESOURCE_CREATED_CODE;
        const message = `${resource} registered successfully`;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'created'}));
    }

    // 204 No Content
    // Action was successfully executed but not exists content to return
    noContent() {
        this.response.status(ResponseService.NO_CONTENT_CODE).send();
    }

    // 304 Not Modified
    // The info has not been changed since the latest request
    notModified() {
        this.response.status(ResponseService.NOT_MODIFIED_CODE).send(); 
    }

    // 400 Bad Request
    // The request is not valid or is malformed
    badRequest(message = 'Bad Request!', data) {
        const statusCode = ResponseService.BAD_REQUEST_CODE;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'bad_request'}));
    }

    // 401 Unauthorized
    // User not authenticated
    unauthorized(data) {
        const statusCode = ResponseService.UNAUTHORIZED_CODE;
        const message = 'Authentication is required!';
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'unauthorized'}));
    }

    // 403 Forbidden
    // User authenticated but without permissions
    forbidden(data) {
        const statusCode = ResponseService.FORBIDDEN_CODE;
        const message = 'Access Denied!';
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'forbidden'}));
    }

    // 404 Not Found
    // The requested resource not found
    notFound(message = 'Resource Not Found!', data) {
        const statusCode = ResponseService.NOT_FOUND_CODE;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'not_found'}));
    }

    // 409 Conflict
    // The request was not completed because there are an conflict with his current state 
    conflict(message = 'Conflict!', data) {
        const statusCode = ResponseService.CONFLICT_CODE;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'conflict'}));
    }

    // 500 Server error
    // Code error, server error
    internalServerError(message = 'Server Error!', data) {
        const statusCode = ResponseService.INTERNAL_ERROR_CODE;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'internal_server_error'}));
    }

    // 503 Service Unavailable
    // The server is not available to handle the request
    serviceUnavailable(message = 'Service Unavailable', data) {
        const statusCode = ResponseService.SERVICE_UNAVAILABLE_CODE;
        this.response.status(statusCode).json(this.addToJson(data, {message, statusCode, primitive: 'service_unavailable'}));
    }
}
 
export default ResponseService;