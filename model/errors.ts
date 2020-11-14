export enum Errors {
    INVALID_CREDENTIALS = 'Username and/or password were incorrect.',
}

/**
 * Preferred way of throwing errors in Promise-based environments like `server`.
 * (Wrapper function that converts `enum` values into actual strings.)
 */
export const Err = (errorCode: Errors) => new Error(errorCode.toString());
