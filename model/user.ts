
/**
 * All data of a one user.
 */
export class User {
    /**
     * Unique identifier.
     */
    id: number;
    /**
     * User’s custom name.
     */
    username: string;
    /**
     * Basic authentication method.
     */
    password: string;
    /**
     * Contact with the user and basically the identity of the user.
     */
    email: string;
    /**
     * Whether the user confirmed his identity (see the email field).
     */
    activated: boolean;
    /**
     * The datetime point when the user joined (UTC).
     */
    dateJoined: Date;
}
