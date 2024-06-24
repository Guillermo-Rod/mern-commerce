import Validator from 'validatorjs';
import RequestValidationError from "../errors/RequestValidationError.mjs";
import authConfig from '../config/auth.mjs';
import jwt from 'jsonwebtoken';

Validator.register('jwt_verify', function(value, tokenConfig, attribute) { 
    try {
        jwt.verify(value, authConfig[tokenConfig].secret_key);
        return true;
    } catch (error) {
        return false;
    }
}, 'The :attribute is not a valid token.');

Validator.register('phone', (value, requirement, attribute) => {
    // Pass if is null or undefined
    if (requirement === 'nullable' && ! value) return true;

    // Must be a number and have 10 digits
    return /^\d{10}$/.test(value);
}, 'The :attribute is not a valid phone number!')

Validator.registerAsync('exists', async (value, requirement, attribute, passes) => {
    if (! value) return true;
    const [Model, column] = requirement;
    const found = await Model.exists({[column]: value});
    passes(found !== null, `The ${attribute} not exists!`)
});


Validator.registerAsync('unique', async (value, requirement, attribute, passes) => {
    if (! value) return true;
    const [Model, column] = requirement;
    const found = await Model.exists({[column]: value});
    passes(found === null, `The ${attribute} already exists!`)
});

export default {
    validateAsync: ({ request, rules, messages, onPasses, onFails }) => {
        const validator = new Validator(request, rules, messages);
        validator.stopOnError(true);

        return new Promise((resolve, reject) => {
            validator.checkAsync(
                async () => {
                    const result = await onPasses();
                    resolve(result);
                }, 
                () => reject(new RequestValidationError(validator))
            );
        });
    },

    validate: (request, rules, messages) => {
        const validator = new Validator(request, rules, messages);

        validator.stopOnError(true);

        if (validator.fails()) {
            throw new RequestValidationError(validator);
        }

        return request;
    }
};