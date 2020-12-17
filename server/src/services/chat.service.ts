import { GLOBAL_CHAT_ID } from '../../../model/chat';
import { DatabaseTables } from '../../../model/database-tables';
import { Message } from '../../../model/message';
import { User } from '../../../model/user';
import { DatabaseService } from './database.service';

export class ChatService {
  constructor(private database: DatabaseService) {}

  public async SendGlobalMessage(sender: User, content: string): Promise<void> {
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      // Compose the message.
      const message: Message = {
        messageId: 0, // The auto-increment will take care of tracking this.
        userId: sender.id,
        content,
        chatId: GLOBAL_CHAT_ID,
        date: new Date(),
      };
      await connection.query(
        'INSERT INTO `' + DatabaseTables.MESSAGES + '` SET ?;',
        [message]
      );
    });
  }

  public async GetGlobalChatMessages(): Promise<Message[]> {
    // Get an array of messages from the global chat.
    let messages: Message[] = [];
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      messages = await connection.query(
        'SELECT * FROM `' + DatabaseTables.MESSAGES + '` WHERE `chatId` = ?;',
        [GLOBAL_CHAT_ID]
      );
    });
    return messages;
  }
}
