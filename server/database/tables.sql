-- Create tables.
USE ccs;
SET FOREIGN_KEY_CHECKS = 0;

-- Store users' credentials.
DROP TABLE IF EXISTS users;
CREATE TABLE users(
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `activated` BOOLEAN NOT NULL,
  `dateJoined` DATE,
  `redPCB` INT DEFAULT 100,
  `bluePCB` INT DEFAULT 100,
  `greenPCB` INT DEFAULT 100,
  PRIMARY KEY (id)
);

-- Store world map data.
DROP TABLE IF EXISTS map;
CREATE TABLE map(
  `id` INT NOT NULL AUTO_INCREMENT,
  `terrain` INT NOT NULL,
  `owner` INT,
  `buildingType` INT,
  `buildingLvl` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`owner`) REFERENCES users(`id`)
  ON DELETE CASCADE
);

-- All communication channels.
DROP TABLE IF EXISTS channels;
CREATE TABLE channels(
  `id` INT NOT NULL AUTO_INCREMENT,
  `private` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`)
);
-- Immediately add the general global channel.
INSERT INTO `channels` VALUES (1, false);

-- All relations chat-to-user.
DROP TABLE IF EXISTS userChat;
CREATE TABLE userChat(
  `userId` INT NOT NULL,
  `chatId` INT NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES users(`id`),
  FOREIGN KEY (`chatId`) REFERENCES channels(`id`)
);

-- All messages.
DROP TABLE IF EXISTS messages;
CREATE TABLE messages(
  `messageId` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `content` TEXT,
  `chatId` INT NOT NULL,
  `date` DATE,
  FOREIGN KEY (`userId`) REFERENCES users(`id`)
);
SET FOREIGN_KEY_CHECKS = 1;
