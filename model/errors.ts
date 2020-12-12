export enum Errors {
  INVALID_CREDENTIALS = 'Username and/or password were incorrect.',
  NOT_LOGGED_IN = 'The user is not logged in.',
  USER_HAS_CELLS = 'The user already owns at least one cell.',
  USER_ALREADY_EXISTS = 'Username and/or email are already in use.',
}

/**
 * Preferred way of throwing errors in Promise-based environments like `server`.
 * (Wrapper function that converts `enum` values into actual strings.)
 */
export const Err = (errorCode: Errors) => new Error(errorCode.toString());
