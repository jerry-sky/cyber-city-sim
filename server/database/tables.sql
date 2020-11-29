-- Create table which will store users' credentials.
USE ccs;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `activated` BOOLEAN NOT NULL,
  `dateJoined` DATE,
  PRIMARY KEY (id)
);

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

SET FOREIGN_KEY_CHECKS = 1;
