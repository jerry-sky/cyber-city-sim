import { Errors } from './errors';
import { User } from './user';
import { Map } from './map';
import { Message } from './message';

export interface LoginResponse {
  user: User;
  hasNoLand: boolean;
}

export interface ErrorResponse {
  errorCode: Errors;
}

export interface MapResponse {
  map: Map;
}

export interface GlobalMessagesResponse {
  messages: Message[];
}

export interface MessageboxUsernamesResponse {
  usernames: string[];
}

export interface UserResponse {
  user: User;
}

export interface PrivateMessagesResponse {
  messages: Message[];
}

export interface UsernameDictionaryResponse {
  users: { id: number; username: string }[];
}
