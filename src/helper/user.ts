import 'server-only';

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified?: boolean | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}
/**
 * Returns a safe version of the user details by removing sensitive information.
 *
 * @param {IUser} user - The user object containing the details to be processed.
 * @return {object} - The safe version of the user details.
 */
export const getSafeUserDetails = (user: IUser): object => {
  const { password, createdAt, ...safeUser } = user;
  return safeUser;
};
