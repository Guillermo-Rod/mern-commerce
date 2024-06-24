export function getClientErrorStructure(overwrite) {
    const structure = {
        error_name: '',
        error_message: '',
        errors: {},
        constructor_reference: 'constructor',
    };

    if (typeof overwrite === 'object') {
        return { ...structure, ...overwrite}
    }

    return structure;
}

export function buildJsonClientError(error) {
    return getClientErrorStructure({
        error_name: error.name,
        error_message: error.message,
        errors: buildNamedErrorsObject(error),
        constructor_reference: error.constructor_reference.ref,
    });
}

function buildNamedErrorsObject (error) {
    // Build {param1: "Some error!", param2: "Another error!"}
    const namedErrors = {};

    if (error.constructor_reference.hasOwnProperty('message')) {
        if (error.hasOwnProperty('parameters') && Array.isArray(error.parameters) && error.parameters.length) {
            error.parameters.forEach(param => namedErrors[param] = `${param} ${error.constructor_reference.message}`);
        }
    }

    return namedErrors;
}
