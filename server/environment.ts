import * as Dotenv from "dotenv";

/**
 * A list of all environment variables.
 */
interface EnvironmentVariables extends NodeJS.ProcessEnv {
    TEST: string;
}

// get the environment variables
Dotenv.config({
    path: __dirname + '/.env'
});
/**
 * Parsed environment variables.
 */
export const Environment = process.env as EnvironmentVariables;

/**
 * The path to the `server` directory.
 */
export const DirectoryPath = __dirname;

