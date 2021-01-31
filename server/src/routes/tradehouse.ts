import { Err, Errors } from '../../../model/errors';
import {
  AcceptTradeOfferRequest,
  CreateTradeOfferRequest,
} from '../../../model/server-requests';
import { TradeOffersResponse } from '../../../model/server-responses';
import { RouterWrapper } from '../auxiliary/express-method-wrapper';
import { DatabaseService } from '../services/database.service';
import { TradeService } from '../services/trade.service';

const Router = new RouterWrapper();

const Database = new DatabaseService();
const Trade = new TradeService(Database);

Router.get<never, TradeOffersResponse, never>(
  '/',
  async (request, response, next) => {
    const offers = await Trade.GetTradeOffers();

    response.json({ list: offers });

    next();
  }
);

Router.post<CreateTradeOfferRequest, never, never>(
  '/',
  async (request, response, next) => {
    if (!request.session || !request.session.user) {
      throw Err(Errors.NOT_LOGGED_IN);
    }

    const p = request.body;

    await Trade.CreateTradeOffer(
      request.session.user,
      p.offeredResource,
      p.offeredAmount,
      p.neededResource,
      p.neededAmount
    );

    response.status(204);

    next();
  }
);

Router.put<AcceptTradeOfferRequest, never, never>(
  '/',
  async (request, response, next) => {
    if (!request.session || !request.session.user) {
      throw Err(Errors.NOT_LOGGED_IN);
    }

    const p = request.body;

    await Trade.AcceptTradeOffer(p.offerId, request.session.user);

    response.status(204);
    next();
  }
);

export default Router;
