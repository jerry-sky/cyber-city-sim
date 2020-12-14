import { Err, Errors } from '../../../model/errors';
import {
  BuyBuildingRequest,
  UpgradeBuildingRequest,
} from '../../../model/server-requests';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { CityService } from '../services/city.service';
import { DatabaseService } from '../services/database.service';

const Router = new RouterWrapper();
const Database = new DatabaseService();
const City = new CityService(Database);

Router.post<UpgradeBuildingRequest, never, never>(
  '/upgrade-building',
  async (request, response, next) => {
    if (!request.session || !request.session.user) {
      throw Err(Errors.NOT_LOGGED_IN);
    }

    const user = request.session.user;
    const p = request.body;

    // upgrade the building
    await City.UpgradeBuilding(user, p.cellId);

    response.status(204);
    next();
  }
);

Router.post<BuyBuildingRequest, never, never>(
  '/buy-building',
  async (request, response, next) => {
    if (!request.session || !request.session.user) {
      throw Err(Errors.NOT_LOGGED_IN);
    }

    const user = request.session.user;
    const p = request.body;

    // buy the building
    await City.BuyBuilding(user, p.cellId, p.buildingType);

    response.status(204);
    next();
  }
);

export default Router;
