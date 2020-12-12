import { MapResponse } from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { Map } from '../../../model/map';
import { DatabaseService } from '../services/database.service';
import { MapService } from '../services/map.service';
import { Err, Errors } from '../../../model/errors';
import { ClaimFirstCellRequest } from '../../../model/server-requests';

const Router = new RouterWrapper();
const Database = new DatabaseService();
const mapService = new MapService(Database);

Router.get<never, MapResponse, never>('/', async (request, response, next) => {
  const map: Map = await mapService.LoadWorldMap();

  response.json({ map });
  next();
});

Router.post<ClaimFirstCellRequest, never, never>(
  '/claim-first-cell',
  async (request, response, next) => {
    // Check if there is an ongoing session to get user's info from.
    if (!request.session && !request.session.user) {
      throw Err(Errors.NOT_LOGGED_IN);
    }
    // If the user has logged in for the first time, give them one cell of their choice.
    if (mapService.HasNoLand(request.session.user)) {
      await mapService.AssignCellToUser(
        request.session.user,
        request.body.cellId
      );
      response.status(204);
    } else {
      throw Err(Errors.USER_HAS_CELLS);
    }
    next();
  }
);

export default Router;
