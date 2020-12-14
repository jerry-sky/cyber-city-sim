import { ResourcesNamesValues } from './terrain-type';

/**
 * All data of a one user.
 */
export declare interface User extends ResourcesNamesValues {
  /**
   * Unique identifier.
   */
  id: number;
  /**
   * User’s custom name.
   */
  username: string;
  /**
   * Basic authentication method.
   */
  password: string;
  /**
   * Contact with the user and basically the identity of the user.
   */
  email: string;
  /**
   * Whether the user confirmed his identity (see the email field).
   */
  activated: boolean;
  /**
   * The datetime point when the user joined (UTC).
   */
  dateJoined: Date;
}
