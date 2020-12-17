/**
 * All messages
 */
export interface Message {
  /**
   * Unique identifier.
   */
  messageId: number;
  /**
   * Id of the message creator (User).
   */
  userId: number;
  /**
   * The content of the message.
   */
  content: string;
  /**
   * The id of the chat that the message was sent to.
   */
  chatId: number;
  /**
   * The datetime point when the message was sent.
   */
  date: Date;
}
