import { BuildingType } from './building-type';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

/**
 * Abstract request shape that is related to the editing of a cell.
 */
export abstract class EditCellRequest {
  cellId: number;
}

/**
 * The user wants to upgrade their building. Only the cell ID is required.
 */
export interface UpgradeBuildingRequest extends EditCellRequest {}

/**
 * The user wants to build a new building on their bought cell.
 */
export interface BuyBuildingRequest extends EditCellRequest {
  buildingType: BuildingType;
}

export interface ClaimCellRequest {
  cellId: number;
}

/**
 * When only information know of user is its id
 */
export interface SimpleIdRequest {
  userId: number;
}

/**
 * The user wants to send message to global chat.
 */

export interface SendGlobalMessageRequest {
  message: string;
}

/**
 * The user wants to send message to private chat.
 */

export interface SendPrivateMessageRequest {
  username: string;
  messageContent: string;
}

export interface GetPrivateMessagesRequest {
  username: string;
}
