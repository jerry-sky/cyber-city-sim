-- Create table which will store users' credentials.
USE ccs;
SET FOREIGN_KEY_CHECKS = 0;

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

DROP TABLE IF EXISTS map;
CREATE TABLE map(
  `id` INT NOT NULL AUTO_INCREMENT,
  `terrain` INT NOT NULL,
  `owner` INT NOT NULL DEFAULT 0,
  `buildingType` INT NOT NULL DEFAULT -1,
  `buildingLvl` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`owner`) REFERENCES users(`id`)
  ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS = 1;
