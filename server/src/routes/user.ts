import {
  LoginRequest,
  RegisterRequest,
  SimpleIdRequest,
} from '../../../model/server-requests';
import { LoginResponse } from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { AuthenticationService } from '../services/auth.service';
import { PasswordService } from '../services/password.service';
import SecurePassword from 'secure-password';
import { DatabaseService } from '../services/database.service';
import { MapService } from '../services/map.service';
import { User } from '../../../model/user';
import { DatabaseTables } from '../../../model/database-tables';
import { Err, Errors } from '../../../model/errors';

const Router = new RouterWrapper();

const Database = new DatabaseService();
const Pass = new PasswordService(new SecurePassword());
const Auth = new AuthenticationService(Database, Pass);
const mapService = new MapService(Database);

Router.post<LoginRequest, LoginResponse, never>(
  '/login',
  async (request, response, next) => {
    const t = request.body;
    const user = await Auth.Login(t.username, t.password);

    request.session.user = user;

    response.json({
      user: { ...user, password: '' },
      hasNoLand: await mapService.HasNoLand(user),
    });

    next();
  }
);

Router.post<RegisterRequest, never, never>(
  '/register',
  async (request, response, next) => {
    const t = request.body;
    await Auth.Register(t.username, t.email, t.password);

    response.status(204);

    next();
  }
);

Router.post<SimpleIdRequest, LoginResponse, never>(
  '/resources',
  async (request, response, next) => {
    const userId = request.body.userId;
    let user: User;
    await Database.ExecuteInsideDatabaseHarness(async (connection) => {
      const results: User[] = await connection.query(
        'SELECT * FROM `' + DatabaseTables.USERS + '` WHERE `id` = ?;',
        [userId]
      );
      user = results[0];
    });

    if (!user) {
      throw Err(Errors.USER_DOES_NOT_EXIST);
    }

    response.json({
      user: { ...user, password: '' },
      hasNoLand: await mapService.HasNoLand(user),
    });

    next();
  }
);

export default Router;
