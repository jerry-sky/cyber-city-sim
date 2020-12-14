import { DatabaseTables } from '../../../model/database-tables';
import { Errors, Err } from '../../../model/errors';
import { User } from '../../../model/user';
import { DatabaseService } from './database.service';
import { PasswordService } from './password.service';

/**
 * Handles authentication for users of this application program.
 */
export class AuthenticationService {
  constructor(private DB: DatabaseService, private PASS: PasswordService) {}
  /**
   * Attempt loggining in to the given user’s account.
   */
  public async Login(username: string, password: string): Promise<User> {
    let user: User;
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      const results: User[] = await connection.query(
        'SELECT * FROM ' +
          DatabaseTables.USERS +
          ' WHERE `username` = ? OR `email` = ?;',
        [username, username]
      );
      if (results.length === 0) {
        // invalid username or email
        throw Err(Errors.INVALID_CREDENTIALS);
      }
      // user found, proceed
      user = results[0];
    });

    // verify the password
    const passwordDatabase = user.password;
    if (!(await this.PASS.VerifyPassword(password, passwordDatabase))) {
      // invalid password
      throw Err(Errors.INVALID_CREDENTIALS);
    }

    return { ...user, password: '' };
  }

  /**
   * Attempt registering new account.
   */
  public async Register(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    const newUser: Partial<User> = {
      id: undefined,
      username,
      email,
      password: await this.PASS.PasswordHash(password),
      activated: true,
      dateJoined: new Date(),
    };

    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      // check if there are no other users of same username and/or email
      const otherUsers: User[] = await connection.query(
        'SELECT * FROM ' +
          DatabaseTables.USERS +
          ' WHERE `username` = ? OR `email` = ?',
        [newUser.username, newUser.email]
      );

      if (otherUsers.length !== 0) {
        // there is at least one — abort
        throw Err(Errors.USER_ALREADY_EXISTS);
      }

      // otherwise add to the database
      await connection.query(
        'INSERT INTO ' + DatabaseTables.USERS + ' SET ?',
        newUser
      );
    });
  }
}
