import { Errors, Err } from '../../../model/errors';
import { User } from '../../../model/user';

const testUser: User = {
    id: 0,
    username: 'test',
    email: 'test@example.com',
    // implement password hashing
    password: 'test',
    activated: true,
    dateJoined: new Date(),
};

export class AuthenticationService {
    public Login(username: string, password: string): User {
        if (username === testUser.username && password === testUser.password) {
            return testUser;
        } else {
            throw Err(Errors.INVALID_CREDENTIALS);
        }
    }
}
