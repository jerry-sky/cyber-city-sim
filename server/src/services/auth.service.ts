import { Errors, Err } from '../../../model/errors';
import { User } from '../../../model/user';

/**
 * Temporary measure — a list of test users.
 */
const testUsers: User[] = [
  {
    id: 0,
    username: 'test',
    email: 'test@example.com',
    // TODO: implement password hashing
    password: 'test',
    activated: true,
    dateJoined: new Date(),
  },
];

/**
 * Handles authentication for users of this application program.
 */
export class AuthenticationService {
  /**
   * Attempt loggining in to the given user’s account.
   */
  public Login(username: string, password: string): User {
    // TODO: implement password hashing (the `secure-password` package)
    let found: User;
    testUsers.forEach((u) => {
      if (
        (username === u.username || username === u.email) &&
        password === u.password
      ) {
        found = u;
        return;
      }
    });
    if (found) {
      // return the data of user
      return found;
    } else {
      // throw an error
      throw Err(Errors.INVALID_CREDENTIALS);
    }
  }

  /**
   * Attempt registering new account.
   */
  public Register(username: string, email: string, password: string): User {
    // TODO implement password hashing, check if user already exists, check if email ic correct etc
    const newUser: User = {
      id: 0,
      username: username,
      email: email,
      password: password,
      activated: true,
      dateJoined: new Date(),
    };
    testUsers.push(newUser);
    return newUser;
  }
}
