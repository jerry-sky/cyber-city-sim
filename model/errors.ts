export enum Errors {
    INVALID_CREDENTIALS = 'Username and/or password were incorrect.',
}

export const Err = (errorCode: Errors) => new Error(errorCode.toString());
