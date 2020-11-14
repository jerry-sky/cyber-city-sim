import { Errors, Err } from '../../../model/errors';
import { User } from '../../../model/user';

/**
 * Temporary measure — a simple test user.
 */
const testUser: User = {
    id: 0,
    username: 'test',
    email: 'test@example.com',
    // TODO: implement password hashing
    password: 'test',
    activated: true,
    dateJoined: new Date(),
};

/**
 * Handles authentication for users of this application program.
 */
export class AuthenticationService {
    /**
     * Attempt loggining in to the given user’s account.
     */
    public Login(username: string, password: string): User {
        // TODO: implement password hashing (the `secure-password` package)
        if (username === testUser.username && password === testUser.password) {
            // return the data of the successfully logged in user
            return testUser;
        } else {
            // throw an error
            throw Err(Errors.INVALID_CREDENTIALS);
        }
    }
}
