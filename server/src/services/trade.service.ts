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
    let selectedOffer: TradeOffer;
    let offeredBy: User;
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      // Find the user who created the offer.
      selectedOffer = (
        await connection.query(
          'SELECT * FROM `' +
            DatabaseTables.TRADE_OFFERS +
            '` WHERE id = ' +
            offerId +
            ';'
        )
      )[0];
      offeredBy = (
        await connection.query(
          'SELECT * FROM `' +
            DatabaseTables.USERS +
            '` WHERE id = ' +
            selectedOffer.sellerId +
            ';'
        )
      )[0];
      // Check if both users have enough resources to complete the trade.
      let resource: ResourceNames = selectedOffer.neededResourceType;
      let quantity: number = selectedOffer.neededResourceQuantity;
      if (acceptedBy[resource] < quantity) {
        // The buyer doesn't have enough supplies to accept the request.
        throw Err(Errors.NO_RESOURCES_FOR_TRADE);
      }
      resource = selectedOffer.offeredResourceType;
      quantity = selectedOffer.offeredResourceQuantity;
      if (offeredBy[resource] < quantity) {
        // The seller doesn't have enough supplies to accept the request.
        throw Err(Errors.NO_RESOURCES_FOR_TRADE);
      }

      await connection.query('CALL TradeResources(?, ?);', [
        offerId,
        acceptedBy.id,
      ]);
    });
  }
}
