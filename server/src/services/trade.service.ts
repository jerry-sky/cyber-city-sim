import { DatabaseTables } from '../../../model/database-tables';
import { Err, Errors } from '../../../model/errors';
import { Resource, ResourceNames } from '../../../model/terrain-type';
import { TradeOffer } from '../../../model/trade-offer';
import { User } from '../../../model/user';
import { DatabaseService } from './database.service';

export class TradeService {
  constructor(private database: DatabaseService) {}

  /**
   * Make a trade offer and put it in the trade house.
   * The creator promises to give the offered resource
   * in exchange for the needed resource.
   */
  public async CreateTradeOffer(
    creator: User,
    offeredResource: Resource,
    offeredAmount: number,
    neededResource: Resource,
    neededAmount: number
  ): Promise<void> {
    // Map the two enums for more concise code.
    const enum_map: { [type: number]: ResourceNames } = {
      0: ResourceNames.RED,
      1: ResourceNames.BLUE,
      2: ResourceNames.GREEN,
    };
    // Check if the user has enough resources to make the trade offer.
    if (creator[enum_map[offeredResource]] < offeredAmount) {
      // Come back when you're a little... mmm, richer.
      throw Err(Errors.NO_RESOURCES_FOR_TRADE);
    }
    // If everything's okay, create a new trade offer.
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      const offer: TradeOffer = {
        id: 0, // The auto-increment will take care of tracking this.
        sellerId: creator.id,
        offeredResourceType: offeredResource,
        offeredResourceQuantity: offeredAmount,
        neededResourceType: neededResource,
        neededResourceQuantity: neededAmount,
      };
      await connection.query(
        'INSERT INTO `' + DatabaseTables.TRADE_OFFERS + '` SET ?;',
        [offer]
      );
    });
  }

  public async GetTradeOffers(): Promise<TradeOffer[]> {
    let offers: TradeOffer[] = [];
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      offers = await connection.query(
        'SELECT * FROM `' + DatabaseTables.TRADE_OFFERS + ';'
      );
    });
    return offers;
  }
}
