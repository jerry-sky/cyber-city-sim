import { Errors } from './errors';
import { User } from './user';
import { Map } from './map';
import { City } from './city';

export interface LoginResponse {
  user: User;
}

export interface ErrorResponse {
  errorCode: Errors;
}

export interface MapResponse {
  map: Map;
}

export interface GetCityResponse {
  city: City;
}
