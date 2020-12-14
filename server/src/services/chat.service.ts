import { GLOBAL_CHAT_ID } from '../../../model/chat';
import { DatabaseTables } from '../../../model/database-tables';
import { Message } from '../../../model/message';
import { User } from '../../../model/user';
import { DatabaseService } from './database.service';

export class ChatService {
  constructor(private database: DatabaseService) {}

  public async SendGlobalMessage(sender: User, content: string): Promise<void> {
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      // compose the message
      const message: Message = {
        chatId: GLOBAL_CHAT_ID,
        content,
        date: new Date(),
        userId: sender.id,
        id: undefined,
      };
      await connection.query(
        'INSERT INTO `' + DatabaseTables.MESSAGE + '` SET ?;',
        [message]
      );
    });
  }

  public async GetGlobalChatMessages(): Promise<Message[]> {
    let messages: Message[] = [];
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      messages = await connection.query(
        'SELECT * FROM `' + DatabaseTables.MESSAGE + '` WHERE `id` = ?;',
        [GLOBAL_CHAT_ID]
      );
    });
    return messages;
  }
}
