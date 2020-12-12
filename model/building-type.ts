/**
 * The state of the owned cell — which (and if) type of the building the user built on given cell.
 */
export enum BuildingType {
  /**
   * No building present.
   */
  EMPTY = -1,
  HOUSE = 0,
  SKYSCRAPER = 1,
  WINDMILL = 2,
}
