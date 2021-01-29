import { ResourceNames } from "./terrain-type";

/**
 * A trade offer template
 */
export interface TradeOffer {
  /**
   * This offer's unique ID.
   */
  id: number;
  /**
   * The user who created the exchange offer.
   */
  sellerId: number;
  /**
   * The type of circuit boards requested by the offer's creator.
   */
  neededResourceType: ResourceNames;
  /**
   * The amount of circuit boards requested.
   */
  neededResourceQuantity: number;
  /**
   * The type of circuit boards given by the offer's creator.
   */
  offeredResourceType: ResourceNames;
  /**
   * The amount of circuit boards given by the offer's creator.
   */
  offeredResourceQuantity: number;
}
