import { MapResponse } from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { Map } from '../../../model/map';
import { DatabaseService } from '../services/database.service';
import { MapService } from '../services/map.service';
import { Err, Errors } from '../../../model/errors';
import { ClaimCellRequest } from '../../../model/server-requests';

const Router = new RouterWrapper();
const Database = new DatabaseService();
const mapService = new MapService(Database);

Router.get<never, MapResponse, never>('/', async (request, response, next) => {
  const map: Map = await mapService.LoadWorldMap();

  response.json({ map });
  next();
});

Router.post<ClaimCellRequest, never, never>(
  '/claim-cell',
  async (request, response, next) => {
    // Check if there is an ongoing session to get user's info from.
    if (!request.session && !request.session.user) {
      throw Err(Errors.NOT_LOGGED_IN);
    }

    // Assign the cell to the user. If it is the first cell they will own,
    // the transaction will introduce no cost for the user.
    await mapService.AssignCellToUser(
      request.session.user,
      request.body.cellId
    );

    next();
  }
);

export default Router;
