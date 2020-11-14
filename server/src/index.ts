import Express, { Request, Response, NextFunction } from 'express';
import ExpressSession from 'express-session';
import SFS from 'session-file-store';
const ExpressSessionFileStore = SFS(ExpressSession);
import CookieParser from 'cookie-parser';

import { DirectoryPath, Environment } from '../environment';

/**
 * The port which the app will listen to.
 */
const port = 3000;

const app = Express();

app.set('trust proxy', 1);
// cookies
app.use(CookieParser(Environment.COOKIE_SECRET));

// logging
app.use((req, res, next) => {
    // log activity
    const date = new Date();
    console.log(
        'Connection attempt on ' +
            date.toString() +
            ' from: ' +
            req.headers['x-forwarded-for']
    );

    next();
});

// origin access: check if origin is approved to connect
app.use((req, res, next) => {
    const origin = req.get('origin');
    // TODO: add origins
    const originsWithAccess = [''];
    // optional origins with access for local testing
    if (Environment.PRODUCTION === 'false') {
        originsWithAccess.push('http://localhost:4200');
        originsWithAccess.push('http://localhost:4201');
        originsWithAccess.push('http://localhost:4202');
    }
    // check if origin is on the list
    if (originsWithAccess.indexOf(origin) > -1) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Content-Type,X-XSRF-TOKEN');
        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        /* spell-checker: disable-next-line */
        res.header('X-Content-Type-Options', 'nosniff');
        res.header(
            'Access-Control-Allow-Methods',
            'POST, OPTIONS, GET, DELETE, PUT'
        );
        res.header('Accept', 'application/json');
    }

    next();
});

const sessionStore = new ExpressSessionFileStore({
    reapInterval: 20 * 60, // 20 min
});
// session middleware
app.use(
    ExpressSession({
        name: 'krzemien-api-session',
        secret: Environment.COOKIE_SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: Environment.PRODUCTION === 'true' ? true : false,
        },
        proxy: true,
    })
);

// for a preflight `OPTIONS` connection send OK status to be accepted by the browser
app.options('*', (req, res) => {
    res.status(204);
    res.end();
});

// attach all routes
app.use('/public/', Express.static(DirectoryPath + '/public/'));

import UserRoutes from './routes/user';

app.use('/user', UserRoutes.getNativeRouter());

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        console.error(error.message, error.name);
        response.status(400);
        response.send('sorry');
        next();
    }
);

// close connection
app.use((req, res) => {
    res.end();
});

app.listen(port, () => {
    const date = new Date();
    console.log(
        '\n\x1b[1mNew server run\x1b[0m',
        '\ninitialized on',
        date.toString(),
        '\n'
    );
});
