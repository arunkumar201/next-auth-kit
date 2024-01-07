'use server';

import { db } from '@/lib/db';

/**
 * Retrieves a user by their email address.
 *
 * @param {string} email - the email address of the user
 * @return {Promise<object>} the user object if found, null otherwise
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(`Error while getting user: ${error}`);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log('Error while getting user id: ', error);
    return null;
  }
};
