-- Create triggers that run on insertion, deletion and so on.
USE ccs;
-- After a new player registers, give them access to the global channel.
DROP TRIGGER IF EXISTS addPlayerToGlobalChat;
CREATE TRIGGER addPlayerToGlobalChat
AFTER INSERT ON `users` FOR EACH ROW
  INSERT INTO `userChat`(`userId`, `chatId`) VALUES(new.id, 1);
