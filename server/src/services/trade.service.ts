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
        offeredResourceType: enum_map[offeredResource],
        offeredResourceQuantity: offeredAmount,
        neededResourceType: enum_map[neededResource],
        neededResourceQuantity: neededAmount,
      };
      await connection.query(
        'INSERT INTO `' + DatabaseTables.TRADE_OFFERS + '` SET ?;',
        [offer]
      );
    });
  }

  /**
   * Retrieve all exchange offers and put them on a list.
   */
  public async GetTradeOffers(): Promise<TradeOffer[]> {
    let offers: TradeOffer[] = [];
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      offers = await connection.query(
        'SELECT * FROM `' + DatabaseTables.TRADE_OFFERS + ';'
      );
    });
    return offers;
  }

  /**
   * Agree to a selected resource exchange.
   * @param offerId This offer's ID, included in the TradeOffer object.
   * @param acceptedBy The user who accepted the exchange request.
   */
  public async AcceptTradeOffer(
    offerId: number,
    acceptedBy: User
  ): Promise<void> {
    // I know eslint doesn't like this style, but frankly I don't care (it "corrects" the code wrong).
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      await connection.query('CALL TradeResources(?, ?);',
        [offerId, acceptedBy.id]
      );
    });
  }
}
