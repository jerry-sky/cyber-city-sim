import { LoginRequest, RegisterRequest } from '../../../model/server-requests';
import {
  LoginResponse,
  RegisterResponse,
} from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { AuthenticationService } from '../services/auth.service';
import { PasswordService } from '../services/password.service';
import SecurePassword from 'secure-password';
import { DatabaseService } from '../services/database.service';

const Router = new RouterWrapper();

const Database = new DatabaseService();
const Pass = new PasswordService(new SecurePassword());
const Auth = new AuthenticationService(Database, Pass);

Router.post<LoginRequest, LoginResponse, never>(
  '/login',
  async (request, response, next) => {
    const t = request.body;
    const user = await Auth.Login(t.username, t.password);

    response.json({ user });

    next();
  }
);

Router.post<RegisterRequest, RegisterResponse, never>(
  '/register',
  async (request, response, next) => {
    const t = request.body;
    const user = await Auth.Register(t.username, t.email, t.password);

    response.json({ user });

    next();
  }
);

export default Router;
