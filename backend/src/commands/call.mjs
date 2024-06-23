import ResourceNotFoundError from "../app/errors/ResourceNotFoundError.mjs";
import * as generateAppKeyCommand from "./generateAppKey.mjs"; 

/**
 * How to find options
 */
const OPTION_FLAG_SYNTAX = '--';

/**
 * How to find options value
 */
const OPTION_VALUE_SYNTAX = '='

/**
 * The reserved option words, starts with a single hyphen "-"
 */
const RESERVED_OPTIONS = {
    '-print' : (command, output) => console.log(output),
    '-help' : ({ config }) => {
        console.log();
        console.log(`Name: ${config.name}\nSyntax: ${config.syntax}\nDescription: ${config.description}`);
        console.log();
        console.table(config.options)
    }
};

/**
 * Available commands
 */
const COMMANDS = [
    generateAppKeyCommand,
];

/**
 * Prompt command and options
 */
const args = process.argv.slice(2); 

/**
 * Command argument name
 */
const commandName = args[0] == '-help' ? null : args[0];

/**
 * Command argument options 
 */
const commandOptions = args.slice(1);

/**
 * Get the reserver options to execute
 */
const reservedOptionsToExecute = commandOptions.filter(opt => RESERVED_OPTIONS.hasOwnProperty(opt));

/**
 * Show all commands information
 */
const callHelp = () => {
    console.log();
    console.log('-> Welcome to call application commands!');
    console.log();
    console.log('-> Just type in your command line: node ./src/commands/call.mjs command_syntax --options-of-command -print');
    console.log('-> Use -print to show output in console.');
    console.log();
    const information = [];

    COMMANDS.forEach(({ config }) => {
        const optionsToString = Object.keys(config.options).map(option => config.options[option].syntax).join(' ');

        information.push({
            command: config.name,
            syntax: config.syntax,
            description: config.description,
            options: optionsToString
        });
    });
    console.table(information);
}

/**
 * Execute command class
 */
const callExistingCommand = () => {
    /**
     * Match command to execute
     */
    const commandToExecute = COMMANDS.find(command => command.config.syntax == commandName);
    if (! commandToExecute) throw new ResourceNotFoundError(commandName);
    
    /**
     * Converts the --option=value to an object
     * to pass to the handler
     * {option:value}
     */
    const objectArgumentsForHandler = {};
    
    /**
     * Build the command options object
     */
    commandOptions.filter(opt => ! RESERVED_OPTIONS.hasOwnProperty(opt)).forEach(opt => {
        const parts = opt.replace(OPTION_FLAG_SYNTAX,'').trim().split(OPTION_VALUE_SYNTAX);
        objectArgumentsForHandler[parts[0]] = parts[1];
    });

    /**
     * Finally execute the concrete command
     */
    const output = commandToExecute.handle(objectArgumentsForHandler);

    
    /**
     * Determine what to do with the result
     * 
     * Print or Show Information command
     */
    reservedOptionsToExecute.forEach(reservedFunction => RESERVED_OPTIONS[reservedFunction](commandToExecute, output));
}

// Execute prompt
commandName 
    ? callExistingCommand()
    : callHelp();