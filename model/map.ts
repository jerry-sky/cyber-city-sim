import { BuildingType } from './building-type';
import { Resource } from './terrain-type';

/**
 * All data of the global map.
 */
export interface Map {
  /**
   * Array of all cells.
   */
  cells: Array<Cell>;
}

export interface Cell {
  /**
   * Terrain type — each terrain cell is rich in some resources.
   */
  terrain: Resource;
  /**
   * ID of the user who owns this cell.
   */
  owner: number;
  /**
   * Type of the building built on this cell.
   * Default value: `EMPTY`.
   */
  buildingType: BuildingType;
  /**
   * Level of the building built on this cell.
   * Default value: 0
   */
  buildingLvl: number;
}
