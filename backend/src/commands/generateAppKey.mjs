import crypto from "crypto";

/**
 * Command config and defaults
 */
export const config = {
    name: 'Generate APP_KEY',
    syntax: 'generate:app-key',
    description: 'Generate a APP_KEY with crypto to use in the .env',
    options: {
        random_bytes: {
            syntax: '--randomBytes',
            default: 64,
            information: 'Integer to use for crypto to generate key',
        },
        string_format: {
            syntax: '--stringFormat',
            default: 'hex',
            information: 'Cast the generated key to string format',
        },
    }
};

/**
 * Execute command
 * @param {randomBytes, stringFormat} arguments
 * @returns String
 */
export const handle = ({randomBytes, stringFormat}) => {
    return crypto
            .randomBytes(parseInt(randomBytes || config.options.random_bytes.default))
            .toString(stringFormat || config.options.string_format.default);
}
