import SecurePassword from 'secure-password';

export class PasswordService {
  constructor(private SP: SecurePassword) {}

  /**
   * Generate a hash for the provided password string.
   */
  public async PasswordHash(password: string): Promise<string> {
    // buffer the password
    const rawPassword = Buffer.from(password);
    // hash the password
    const hashedPassword = await this.SP.hash(rawPassword);
    // return the password in a hashed string form
    return hashedPassword.toString('base64');
  }

  /**
   * Compare the provided password with the one in the database.
   */
  public async VerifyPassword(
    passwordProvided: string,
    passwordDatabase: string
  ): Promise<boolean> {
    const passProv = Buffer.from(passwordProvided);
    const passDb = Buffer.from(passwordDatabase, 'base64');

    const result = await this.SP.verify(passProv, passDb);

    switch (result) {
      case SecurePassword.VALID_NEEDS_REHASH:
        console.warn(
          'VALID password — NEEDS REHASH at ' + new Date().toString()
        );
        return true;
      case SecurePassword.VALID:
        return true;
      default:
        return false;
    }
  }
}
