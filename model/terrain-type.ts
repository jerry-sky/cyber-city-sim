/**
 * Type of the resource that can be found in a given cell.
 */
export enum Resource {
  /**
   * Red PCB.
   */
  RED = 0,
  /**
   * Blue PCB.
   */
  BLUE = 1,
  /**
   * Green PCB.
   */
  GREEN = 2,
}

export enum ResourceNames {
  RED = 'redPCB',
  BLUE = 'bluePCB',
  GREEN = 'greenPCB',
}

/**
 * All the resources as an object.
 */
export type ResourcesNamesValues = {
  [key in ResourceNames]: number;
};

/**
 * Calculate the cost of one cell based on the terrain of the cell and how many cells the player already owns.
 */
export const CellCost = (terrainType: Resource, ownedLand: number) => {
  switch (terrainType) {
    // TODO: implement some game algebra — maybe the user should choose which resource they want to spend?
    default:
      return Math.floor((1.618 ^ ownedLand) * 70);
  }
};

/**
 * How frequently the resources generate.
 */
export const ResourceInterval = 3; //seconds
