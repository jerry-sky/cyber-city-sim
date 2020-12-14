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
  looop: LOOP
    SET i = i + 1;
    IF i = size THEN
      LEAVE looop;
    ELSE
      SET terrain = 3 * RAND();
      INSERT INTO `map`(`id`, `terrain`, `owner`, `buildingType`, `buildingLvl`)
        VALUES (i, terrain, NULL, -1, NULL);
    END IF;
  END LOOP looop;
  SET FOREIGN_KEY_CHECKS = 1;
END $$
DELIMITER ;
