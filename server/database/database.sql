-- Create the default database access for a regular player.
DROP USER IF EXISTS 'ccs-user'@'localhost';
CREATE USER 'ccs-user'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS ccs CHARACTER SET = utf8mb4;

-- Grant privileges to the user: SELECT for verifying their credentials,
-- INSERT to allow registration and UPDATE to change the credentials.
GRANT SELECT, INSERT, UPDATE, EXECUTE ON ccs.* TO 'ccs-user'@'localhost';
FLUSH PRIVILEGES;

USE ccs;
