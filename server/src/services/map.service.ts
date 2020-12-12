import { Map } from '../../../model/map';
import { DatabaseService } from './database.service';

export class MapService {
  constructor(private DB: DatabaseService) {}

  public async LoadWorldMap(): Promise<Map> {
    let map: Map;
    await this.DB.ExecuteInsideDatabaseHarness(async (connection) => {
      map.cells = await connection.query('SELECT * FROM `map`');
    });
    return map;
  }
}
