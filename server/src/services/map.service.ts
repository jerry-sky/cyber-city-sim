import { DatabaseTables } from '../../../model/database-tables';
import { Cell, Map } from '../../../model/map';
import { User } from '../../../model/user';
import { DatabaseService } from './database.service';

export class MapService {
  constructor(private DB: DatabaseService) {}

  /**
   * Load the world map data from the database.
   */
  public async LoadWorldMap(): Promise<Map> {
    let map: Map;
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      map.cells = await connection.query('SELECT * FROM `map`');
    });
    return map;
  }
  /**
   * Check if the user controls any cells.
   * Return true if they do, and false otherwise.
   * @param user The user in question.
   */
  public async HasNoLand(user: User): Promise<boolean> {
    let ownedLand: Cell[];
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      ownedLand = await connection.query(
        'SELECT * FROM ' + DatabaseTables.MAP + ' WHERE `owner` = ?',
        [user.id]
      );
    });
    const n = ownedLand.length;
    return n === 0;
  }
  /**
   * Assign one cell of the map to a user.
   * @param user The user that will be granted the cell.
   * @param index The cell's index number.
   * @param cell The cell object containing information about resources and the like.
   */
  //TODO: introduce cell's cost.
  public async AssignCellToUser(user: User, index: number): Promise<void> {
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      await connection.query(
        'UPDATE ' + DatabaseTables.MAP + ' SET `owner` = ? WHERE `id` = ?',
        [user.id, index]
      );
    });
  }
}
