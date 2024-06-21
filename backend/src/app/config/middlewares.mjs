import checkAuthJWTokens from "../middlewares/checkAuthJWTokens.mjs";

// Middlewares
export const middlewares = {
    jwt_auth : {
        middleware: checkAuthJWTokens,
        excluded_paths: [
            '/login' ,
            '/signup',
            '/refresh-token'
        ]
    }
};

export function getMiddlewares() {
    var callbacks = [];

    for (const middleware in middlewares) {
        callbacks.push(middlewares[middleware].middleware)
    }

    return callbacks;
}