import { Errors } from './errors';
import { User } from './user';
import { Map } from './map';

export interface LoginResponse {
  user: User;
}

export type RegisterResponse = LoginResponse;

export interface ErrorResponse {
  errorCode: Errors;
}

export interface MapResponse {
  map: Map;
}
