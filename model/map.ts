/**
 * All data of global map
 */
export declare interface Map {
  /**
   * Array of all cells (20 x 20 = 400)
   */
  cells: Array<Cell>;
}

export declare interface Cell {
  /**
   * type of terrain (0,1,2) - each terrain rich is some sources
   */
  terrain: number;
  /**
   * Id of user who wons this cell
   */
  owner: number;
  /**
   * Type of building, default -1 if empty
   */
  buildingType: number;
  /**
   * Level of building, default 0
   */
  buildingLvl: number;
}
