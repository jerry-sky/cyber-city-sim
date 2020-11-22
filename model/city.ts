
/**
 * All data of global map
 */
export declare interface City {
    /**
     * Array of all cells (20 x 20 = 400)
     */
    cells: Array<CityCell>;
}

export declare interface CityCell {
    /**
     * if cell belongs to the city
     */
    owned: boolean;
    /**
     * type of terrain (0,1,2) - each terrain rich is some sources
     */
    terrain: number;
    /**
     * Type of building
     */
    buildingType: number;
    /**
     * Level of building
     */
    buildingLvl: number;
}