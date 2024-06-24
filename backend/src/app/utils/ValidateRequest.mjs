import Validator from 'validatorjs';
import RequestValidationError from "../errors/RequestValidationError.mjs";

export default {
    validate: (request, rules, messages) => {
        const validation = new Validator(request, rules, messages);

        if (validation.fails()) {
            throw new RequestValidationError(validation);
        }
    }
};