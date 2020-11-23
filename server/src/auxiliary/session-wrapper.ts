import { User } from '../../../model/user';

/**
 * All data kept during a session of a given user.
 */
export interface SessionWrapper extends Express.Session {
  /**
   * User’s data (if logged in).
   */
  user?: User;
}
