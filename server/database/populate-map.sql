-- A procedure that fills the `map` table with records representing the cells.
USE ccs;
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
