-- Various procedures that help with the database management.
USE ccs;
-- A procedure that fills the `map` table with records representing the cells.
DROP PROCEDURE IF EXISTS PopulateMap;
DELIMITER $$
CREATE PROCEDURE PopulateMap(size INT)
BEGIN
  DECLARE i INT;
  DECLARE terrain INT;
  SET FOREIGN_KEY_CHECKS = 0;
  TRUNCATE TABLE `map`;
  SET i = 0;
  loop1: LOOP
    IF i = size THEN
      LEAVE loop1;
    END IF;
    SET i = i + 1;
    SET terrain = 2 * RAND();
    INSERT INTO `map`(`id`, `terrain`, `owner`, `buildingType`, `buildingLvl`)
      VALUES (i, terrain, 0, -1, 0);
  END LOOP loop1;
  SET FOREIGN_KEY_CHECKS = 1;
END $$
DELIMITER ;
-- A procedure that creates a private chat between two users.
DROP PROCEDURE IF EXISTS CreateChannel;
DELIMITER $$
CREATE PROCEDURE CreateChannel(userId1 INT, userId2 INT)
BEGIN
  DECLARE chatId INT;
  INSERT INTO `channels` VALUES (0, true);
  SET chatId = (SELECT MAX(`id`) FROM `channels`);
  INSERT INTO `userChat` VALUES (userId1, chatId);
  INSERT INTO `userChat` VALUES (userId2, chatId);
END $$
DELIMITER ;
-- A transaction finalizing an exchange of resources between two players.
-- Don't ever ask me about this procedure.
DROP PROCEDURE IF EXISTS TradeResources;
DELIMITER $$
CREATE PROCEDURE TradeResources(offerId INT, buyerId INT)
BEGIN
  DECLARE boughtResource VARCHAR(10);
  DECLARE boughtAmount INT;
  DECLARE soldResource VARCHAR(10);
  DECLARE soldAmount INT;

  DECLARE sellId INT;
  DECLARE query TEXT;
  SELECT
    sellerId, neededResourceType, neededResourceQuantity, offeredResourceType, offeredResourceQuantity
  INTO
    sellId, boughtResource, boughtAmount, soldResource, soldAmount
  FROM tradeOffers WHERE id = offerId;

  -- First subtract the respective PCBs from the users.
  SET query = CONCAT('UPDATE users SET `', soldResource, '` = `', soldResource, '` - ', CAST(soldAmount as CHAR), ' WHERE id = ', CAST(sellId as CHAR));
  PREPARE stmt FROM query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;

  SET query = CONCAT('UPDATE users SET `', boughtResource, '` = `', boughtResource, '` - ', CAST(boughtAmount as CHAR), ' WHERE id = ', CAST(buyerId as CHAR));
  PREPARE stmt FROM query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;

  -- Next swap the resources and complete the transaction.
  SET query = CONCAT('UPDATE users SET `', boughtResource, '` = `', boughtResource, '` + ', CAST(boughtAmount as CHAR), ' WHERE id = ', CAST(sellId as CHAR));
  PREPARE stmt FROM query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;

  SET query = CONCAT('UPDATE users SET `', soldResource, '` = `', soldResource, '` + ', CAST(soldAmount as CHAR), ' WHERE id = ', CAST(buyerId as CHAR));
  PREPARE stmt FROM query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;

  -- Finally, remove the trade offer from the tradehouse.
  DELETE FROM tradeOffers WHERE `id` = offerId;
END $$
