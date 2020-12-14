-- A script that forcefully "registers" two test users, then assigns them some land.
-- The credentials are:
-- Login  Password
-- Alice  alice
-- Bob    bob
USE ccs;

INSERT INTO `users` VALUES (1, 'Alice',
'JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJGdnc1JFeEpZMlZTUDZ6eGdCQ3VpZ2ckd1BSRm5ZcW93OEwvS1U2ZTVlSlNYbEpjRUdCRTFxbW9Mek9iejJpS0dkbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
'Alice@gmail.com', 1, '2020-12-14');

INSERT INTO `users` VALUES (2, 'Bob',
'JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJElTWHdacXNGV1VyMFF4Ykh6OGxlYUEkUldlcUZ2SW1tc3pOZ0FuUUFUV2d5R3JzOUNodlQ3TGtuZElTUTczQ0VYMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
'Bob@gmail.com', 1, '2020-12-14');

UPDATE `map` SET `owner` = 1 WHERE `id` = 1;
UPDATE `map` SET `owner` = 1 WHERE `id` = 2;
UPDATE `map` SET `owner` = 1 WHERE `id` = 21;

UPDATE `map` SET `owner` = 2 WHERE `id` = 331;
UPDATE `map` SET `owner` = 2 WHERE `id` = 332;
UPDATE `map` SET `owner` = 2 WHERE `id` = 333;
