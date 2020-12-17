import { DatabaseTables } from '../../../model/database-tables';
import { Err, Errors } from '../../../model/errors';
import { Cell, Map } from '../../../model/map';
import { CellCost, Resource, ResourceNames } from '../../../model/terrain-type';
import { User } from '../../../model/user';
import { DatabaseService } from './database.service';

export class MapService {
  constructor(private DB: DatabaseService) {}

  /**
   * Load the world map data from the database.
   */
  public async LoadWorldMap(): Promise<Map> {
    const map: Map = { cells: [] };
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      map.cells = await connection.query('SELECT * FROM `map`');
    });
    return map;
  }
  /**
   * Returns how many cells does the given user own.
   */
  public async HowManyCellsUserOwns(user: User): Promise<number> {
    let ownedLand: Cell[];
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      ownedLand = await connection.query(
        'SELECT * FROM ' + DatabaseTables.MAP + ' WHERE `owner` = ?',
        [user.id]
      );
    });
    return ownedLand.length;
  }
  /**
   * Check if the user controls any cells.
   * Return true if they do, and false otherwise.
   * @param user The user in question.
   */
  public async HasNoLand(user: User): Promise<boolean> {
    return (await this.HowManyCellsUserOwns(user)) === 0;
  }
  /**
   * Assign one cell of the map to a user.
   * @param user The user that will be granted the cell.
   * @param index The cell's index number.
   */
  public async AssignCellToUser(user: User, index: number): Promise<void> {
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      // First — ensure that the cell belongs to no one.
      const results: Cell[] = await connection.query(
        'SELECT * FROM ' +
          DatabaseTables.MAP +
          ' WHERE `owner` = 0 AND `id` = ?',
        [index]
      );
      if (results.length === 1) {
        // There is only one cell of such ID.
        const cell = results[0];
        // Chosen cell is free — assign it to the user.
        const ownedLand = await this.HowManyCellsUserOwns(user);
        if (ownedLand > 0) {
          // If the user does own any cells — charge resources for them.
          // Get the resources that the user currently owns.
          const userResources = await connection.query(
            'SELECT `redPCB`, `bluePCB`, `greenPCB` FROM `' +
              DatabaseTables.USERS +
              '` WHERE `id` = ?',
            [user.id]
          );
          // Decide which resource to alter because of this transaction.
          let key: keyof User = ResourceNames.RED;
          if (cell.terrain === Resource.BLUE) {
            key = ResourceNames.BLUE;
          } else if (cell.terrain === Resource.GREEN) {
            key = ResourceNames.GREEN;
          }
          // Generate appropriate user data object with new data.
          const userDataChanged: Partial<User> = {
            // Changed parameter: new resource value affected by the cost of this purchase.
            [key]: userResources[key] - CellCost(cell.terrain, ownedLand),
          };
          if (userDataChanged[key] < 0) {
            // Unfortunately, the user cannot afford this purchase.
            throw Err(Errors.INSUFFICIENT_FUNDS);
          }

          // Finally, save the new resource value.
          await connection.query(
            'UPDATE `' + DatabaseTables.USERS + '` SET ? WHERE `id` = ?',
            [userDataChanged, user.id]
          );
        }
        // Assign the cell to the user.
        await connection.query(
          'UPDATE ' + DatabaseTables.MAP + ' SET `owner` = ? WHERE `id` = ?',
          [user.id, index]
        );
      } else {
        // Cell is already owned by someone else.
        throw Err(Errors.CELL_OWNED_BY_SOMEONE_ELSE);
      }
    });
  }
}
