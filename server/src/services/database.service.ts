import MySQL, { Connection, ConnectionConfig } from 'promise-mysql';
import { Environment } from '../../environment';

/**
 * Database service that avails its clients to connect to the database.
 */
export class DatabaseService {
  /**
   * Basic database connection config.
   */
  private connectionOptions: ConnectionConfig = {
    host: 'localhost',
    database: Environment.DATABASE_NAME,
    user: Environment.DB_USERNAME,
    password: Environment.DB_PASSWORD,
  };

  /**
   * Establish a connection to the database.
   * It needs to be closed using the `end` method.
   */
  private async buildDatabaseConnection(): Promise<Connection> {
    return await MySQL.createConnection(this.connectionOptions);
  }

  /**
   * Execute given set of instructions encapsulated inside a function
   * within a given connection.
   * This method ensures that the connection will be closed and the
   * client of this method does not need to worry about it.
   */
  public async ExecuteInsideDatabaseHarness(
    toExecute: (connection: Connection) => Promise<void>
  ): Promise<void> {
    // establish a connection
    const connection = await this.buildDatabaseConnection();
    // execute what was given
    await toExecute(connection);
    // terminate the connection
    await connection.end();
  }
}
