import { Errors } from './errors';
import { User } from './user';

export interface LoginResponse {
    user: User;
}

export interface ErrorResponse {
    errorCode: Errors;
}
