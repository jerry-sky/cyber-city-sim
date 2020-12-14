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

export const MAX_BUILDING_LEVEL = 2;

export interface Cell {
  /**
   * Unique identifier.
   */
  id: number;
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
