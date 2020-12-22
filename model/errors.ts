export enum Errors {
  INVALID_CREDENTIALS = 'Username and/or password were incorrect.',
  NOT_LOGGED_IN = 'The user is not logged in.',
  USER_HAS_CELLS = 'The user already owns at least one cell.',
  USER_ALREADY_EXISTS = 'Username and/or email are already in use.',
  CELL_NOT_OWNED = 'Selected cell is not owned by the user.',
  CANT_UPGRADE_EMPTY_CELL = 'Selected cell does not have a building to upgrade.',
  MAX_BUILDING_LEVEL = 'Can’t upgrade a building that is maxed out.',
  BUILDING_ALREADY_EXISTS = 'Can’t buy a building on a cell that already has a building.',
  NONEXISTENT_CHAT = 'The are no recorded messages between the selected users.',
  USER_DOES_NOT_EXIST = 'Selected user doesn’t exist.',
  CELL_OWNED_BY_SOMEONE_ELSE = 'Chosen cell is already owned by some other player.',
  INSUFFICIENT_FUNDS = 'Desired purchase could not be successfully completed due to lack of resources (funds).',
}

/**
 * Preferred way of throwing errors in Promise-based environments like `server`.
 * (Wrapper function that converts `enum` values into actual strings.)
 */
export const Err = (errorCode: Errors) => new Error(errorCode.toString());
