import { LoginRequest, RegisterRequest } from '../../../model/server-requests';
import { LoginResponse } from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { AuthenticationService } from '../services/auth.service';

const Router = new RouterWrapper();

const Auth = new AuthenticationService();

Router.post<LoginRequest, LoginResponse, never>(
    '/login',
    (request, response, next) => {
        const t = request.body;
        const user = Auth.Login(t.username, t.password);

        response.json({ user });

        next();
    }
);

Router.post<RegisterRequest, LoginResponse, never>(
    '/register',
    (request, response, next) => {
        const t = request.body;
        const user = Auth.Register(t.username, t.email, t.password);

        response.json({ user });

        next();
    }
);

export default Router;
