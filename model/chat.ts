/**
 * All chats.
 */
export interface Chat {
  /**
   * Unique identifier.
   */
  id: number;
  /**
   * Whether the chat is private or not (can be global or a group chat).
   */
  private: boolean;
}

export const GLOBAL_CHAT_ID = 1;
