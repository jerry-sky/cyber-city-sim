import { Errors } from './errors';
import { User } from './user';
import { Map } from './map';
import { Message } from './message';
import { TradeOffer } from './trade-offer';

export interface LoginResponse {
  user: User;
  land: number;
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

export interface TradeOffersResponse {
  list: TradeOffer[];
}
