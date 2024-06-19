import ResponseService from "../utils/ResponseService.mjs";

class CommandNotFoundError extends Error {
    constructor(command) {
        super();
        this.name = "CommandNotFoundError";
        this.statusCode = ResponseService.NOT_FOUND_CODE;
        this.message = `${command} Not Found!`;
    }
}

export default CommandNotFoundError;