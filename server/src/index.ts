import Express, { Request, Response, NextFunction } from 'express';
import ExpressSession from 'express-session';
import SFS from 'session-file-store';
const ExpressSessionFileStore = SFS(ExpressSession);
import CookieParser from 'cookie-parser';
import { Errors } from '../../model/errors';
import { ErrorResponse } from '../../model/server-responses';

import { DirectoryPath, Environment } from '../environment';
import { DatabaseService } from './services/database.service';
import { DatabaseTables } from '../../model/database-tables';
import { HourlyProduction } from '../../model/resource-production/hourly-production';
import { User } from '../../model/user';
import { Cell } from '../../model/map';
import { Resource, ResourcesNamesValues } from '../../model/terrain-type';
import { BuildingType } from '../../model/building-type';

import UserRoutes from './routes/user';
import MapRoutes from './routes/map';
import CityRoutes from './routes/city';

/**
 * The port which the app will listen to.
 */
const port = 3000;

const app = Express();

app.set('trust proxy', 1);
// cookies
app.use(CookieParser(Environment.COOKIE_SECRET));
// json parser
app.use(Express.json());

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
    originsWithAccess.push('https://web.postman.co/');
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
    name: 'css-api-session',
    secret: Environment.COOKIE_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: Environment.PRODUCTION === 'true',
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

app.use('/user', UserRoutes.getNativeRouter());

app.use('/map', MapRoutes.getNativeRouter());

app.use('/city', CityRoutes.getNativeRouter());

// error handler
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    /**
     * Get the error code.
     */
    const err = error.message as Errors;

    /**
     * The HTTP status code.
     * (default is 400)
     */
    let status = 400;

    switch (err) {
      case Errors.INVALID_CREDENTIALS:
        status = 401;
        break;
      default:
        console.error(error);
        break;
    }

    // compose a response object
    const res: ErrorResponse = {
      errorCode: err,
    };

    response.status(status).json(res);
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

// the main resource loop
// every X minutes update user’s resources based on their earnings
const ResourceInterval = 3; //seconds
const Database = new DatabaseService();
setInterval(async () => {
  await Database.ExecuteInsideDatabaseHarness(async (connection) => {
    const users: Partial<User>[] = await connection.query(
      'SELECT `id`, `redPCB`, `bluePCB`, `greenPCB` FROM `' +
        DatabaseTables.USERS +
        '`;'
    );

    for (const user of users) {
      // get all the cells that belong to the user
      const cells: Cell[] = await connection.query(
        'SELECT * FROM `' + DatabaseTables.MAP + '` WHERE `owner` = ?;',
        [user.id]
      );

      const userResources: ResourcesNamesValues = {
        bluePCB: user.bluePCB,
        greenPCB: user.greenPCB,
        redPCB: user.redPCB,
      };

      for (const cell of cells) {
        if (cell.buildingType === BuildingType.EMPTY) {
          // no building to profit from
          continue;
        }

        // get the hourly production values
        const h =
          HourlyProduction[
            'building-' + cell.buildingType + '-lvl-' + cell.buildingLvl
          ]; // I hate this

        // benefit from the building on this cell with respect to the terrain type of this cell
        switch (cell.terrain) {
          case Resource.BLUE:
            userResources.bluePCB += h.blue;
            break;
          case Resource.GREEN:
            userResources.greenPCB += h.green;
            break;
          case Resource.RED:
            userResources.redPCB += h.red;
            break;
        }
      }
      // update user’s earned resources
      await connection.query(
        'UPDATE `' + DatabaseTables.USERS + '` SET ? WHERE `id` = ?;',
        [<Partial<User>>{ ...userResources }, user.id]
      );
    }
  });
}, 1000 * ResourceInterval);
