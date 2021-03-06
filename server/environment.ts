import * as Dotenv from 'dotenv';

/**
 * A list of all environment variables.
 */
interface EnvironmentVariables {
  COOKIE_SECRET: string;
  PRODUCTION: 'true' | 'false';
  DATABASE_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
}

// get the environment variables
Dotenv.config({
  path: __dirname + '/.env',
});
/**
 * Parsed environment variables.
 */
export const Environment: EnvironmentVariables = (process.env as unknown) as EnvironmentVariables;

/**
 * The path to the `server` directory.
 */
export const DirectoryPath = __dirname;
