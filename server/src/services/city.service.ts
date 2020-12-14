import { BuildingType } from '../../../model/building-type';
import { DatabaseTables } from '../../../model/database-tables';
import { Err, Errors } from '../../../model/errors';
import { Cell, MAX_BUILDING_LEVEL } from '../../../model/map';
import { User } from '../../../model/user';
import { DatabaseService } from './database.service';

export class CityService {
  constructor(private DB: DatabaseService) {}

  /**
   * Upgrade the already existing building built on the provided cell.
   */
  public async UpgradeBuilding(user: User, cellId: number): Promise<void> {
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      // first check if the user owns provided cell
      const results: Cell[] = await connection.query(
        'SELECT * FROM `' +
          DatabaseTables.MAP +
          '` WHERE `id` = ? AND `owner` = ?',
        [cellId, user.id]
      );
      if (results.length !== 1) {
        // there is no such cell that is owned by the user
        throw Err(Errors.CELL_NOT_OWNED);
      }
      // (there is only one cell of such ID)
      const cell = results[0];

      if (cell.buildingType === BuildingType.EMPTY) {
        // there is no building to upgrade
        throw Err(Errors.CANT_UPGRADE_EMPTY_CELL);
      }

      if (cell.buildingLvl === MAX_BUILDING_LEVEL) {
        // max level reached
        throw Err(Errors.MAX_BUILDING_LEVEL);
      }

      // otherwise upgrade the building
      await connection.query(
        'UPDATE `' + DatabaseTables.MAP + '` SET ? WHERE `id` = ?;',
        [<Partial<Cell>>{ buildingLvl: cell.buildingLvl + 1 }, cell.id]
      );
    });
  }

  public async BuyBuilding(
    user: User,
    cellId: number,
    buildingType: BuildingType
  ): Promise<void> {
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      // first check if the user owns provided cell
      const results: Cell[] = await connection.query(
        'SELECT * FROM `' +
          DatabaseTables.MAP +
          '` WHERE `id` = ? AND `owner` = ?',
        [cellId, user.id]
      );
      if (results.length !== 1) {
        // there is no such cell that is owned by the user
        throw Err(Errors.CELL_NOT_OWNED);
      }
      // (there is only one cell of such ID)
      const cell = results[0];

      if (cell.buildingType !== BuildingType.EMPTY) {
        // there is already a building
        throw Err(Errors.BUILDING_ALREADY_EXISTS);
      }

      // otherwise set the buildingType
      await connection.query(
        'UPDATE `' + DatabaseTables.MAP + '` SET ? WHERE `id` = ?;',
        [<Partial<Cell>>{ buildingType }, cell.id]
      );
    });
  }
}
