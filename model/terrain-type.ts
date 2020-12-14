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
