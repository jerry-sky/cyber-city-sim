import { MapResponse } from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { Map } from '../../../model/map';
import { DatabaseService } from '../services/database.service';

const Router = new RouterWrapper();
const Database = new DatabaseService();

Router.get<never, MapResponse, never>('/', async (request, response, next) => {
  const map: Map = { cells: [] };

  Database.ExecuteInsideDatabaseHarness(async (connection) => {
    map.cells = await connection.query('SELECT * FROM `map`');
  });

  response.json({ map });
  next();
});

export default Router;
