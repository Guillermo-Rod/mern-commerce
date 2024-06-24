import AuthValidationError from "./AuthValidationError.mjs";
import ModelAlreadyExistsError from "./ModelAlreadyExistsError.mjs";
import ParametersError from "./ParametersError.mjs";
import ResourceNotFoundError from "./ResourceNotFoundError.mjs";
import { getClientErrorStructure } from "../utils/clientErrorStructure.mjs";
import jwt from "jsonwebtoken";
import ResponseService from "../utils/ResponseService.mjs";
import ForbiddenError from "./ForbiddenError.mjs";
import RequestValidationError from "./RequestValidationError.mjs";

class ErrorHandler {

    static handleAsMiddleware(err, req, res, next) {
        return ErrorHandler.handle(err, res);
    }

    /**
     * Handle error
     * 
     * @param Error error 
     * @param ServerResponse response (express res)
     */

    static handle(error, res) {
        const response = new ResponseService(res);

        if (error instanceof ResourceNotFoundError) {
            response.notFound(error.message, error.toJson());
        }else if (error instanceof AuthValidationError || error instanceof ParametersError || error instanceof RequestValidationError) {
            response.badRequest(error.message, error.toJson());   
        }else if (error instanceof ModelAlreadyExistsError) {
            response.conflict(error.message, error.toJson());
        }else if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError || error instanceof jwt.NotBeforeError) {
            response.unauthorized(getClientErrorStructure({
                error_name : 'AuthTokenError',
                error_message : error.message
            }));
        }else if (error instanceof ForbiddenError) {
            response.forbidden(getClientErrorStructure({
                error_name: 'ForbiddenError',
                error_message: error.message,
            }));
        }else {
            response.internalServerError(getClientErrorStructure({
                error_name: 'InternalServerError',
                error_message: error.message,
            }));
        }
    }
}
 
export default ErrorHandler;