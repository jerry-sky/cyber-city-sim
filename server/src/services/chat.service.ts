import { GLOBAL_CHAT_ID } from '../../../model/chat';
import { DatabaseTables } from '../../../model/database-tables';
import { Err, Errors } from '../../../model/errors';
import { Message } from '../../../model/message';
import { User } from '../../../model/user';
import { DatabaseService } from './database.service';

export class ChatService {
  constructor(private database: DatabaseService) {}

  /**
   * Compose a new message and broadcast it in the public channel.
   * @param sender The one who sends.
   * @param content The message's body.
   */
  public async SendGlobalMessage(sender: User, content: string): Promise<void> {
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
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

  /**
   * Get an array of messages from the global chat.
   */
  public async GetGlobalChatMessages(): Promise<Message[]> {
    let messages: Message[] = [];
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      messages = await connection.query(
        'SELECT * FROM `' + DatabaseTables.MESSAGES + '` WHERE `chatId` = ?;',
        [GLOBAL_CHAT_ID]
      );
    });
    return messages;
  }

  /**
   * Create a private chat between two users and add them to it.
   */
  private async CreatePrivateChannel(user1: User, user2: User): Promise<void> {
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      await connection.query('CALL CreateChannel(?, ?);', [user1.id, user2.id]);
    });
  }

  /**
   * Figure out the private chatroom's ID for storage purposes.
   */
  private async GetChannelId(user1: User, user2: User): Promise<number> {
    let result: { chatId: number }[] = [];
    // Find the users' mutual channel that is not the global one.
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      result = await connection.query(
        'SELECT u1.chatId FROM `' +
          DatabaseTables.USER_CHAT +
          '` AS u1 INNER JOIN userChat AS u2 ON u1.chatId = u2.chatId \
          AND u1.userId = ? AND u2.userId = ? AND u1.chatId <> ?;',
        [user1.id, user2.id, GLOBAL_CHAT_ID]
      );
    });
    if (result.length === 1) {
      return result[0].chatId;
    } else {
      // Either the channel doesn't exist (yet) or the method was used incorrectly.
      return null;
    }
  }

  /**
   * Send a private message to another user.
   */
  public async SendPrivateMessage(
    sender: User,
    receiver: User,
    content: string
  ): Promise<void> {
    // Figure out the chat ID.
    let chatId = await this.GetChannelId(sender, receiver);
    if (chatId === null) {
      // If the players haven't communicated with eachother yet, create a new private channel.
      await this.CreatePrivateChannel(sender, receiver);
      chatId = await this.GetChannelId(sender, receiver);
    }
    // Finally, compose the message and send it to the recipient.
    await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
      const message: Message = {
        messageId: 0, // The auto-increment will take care of tracking this.
        userId: sender.id,
        content,
        chatId,
        date: new Date(),
      };
      await connection.query(
        'INSERT INTO `' + DatabaseTables.MESSAGES + '` SET ?;',
        [message]
      );
    });
  }

  /**
   * Get an array of messages from the global chat.
   */
  public async GetPrivateChatMessages(
    user1: User,
    user2: User
  ): Promise<Message[]> {
    let messages: Message[] = [];
    const chatId = await this.GetChannelId(user1, user2);
    if (chatId !== null) {
      await this.database.ExecuteInsideDatabaseHarness(async (connection) => {
        messages = await connection.query(
          'SELECT * FROM `' + DatabaseTables.MESSAGES + '` WHERE `chatId` = ?;',
          [chatId]
        );
      });
    } else {
      // There was never any communication between the selected users.
      throw Err(Errors.NONEXISTENT_CHAT);
    }
    return messages;
  }
}
