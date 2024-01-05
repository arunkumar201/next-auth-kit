import 'server-only';

import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

export interface IUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified?: Date | null;
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
export const getSafeUserDetails = (user: IUser) => {
  const { password, createdAt, id, ...safeUser } = user;
  return safeUser;
};
