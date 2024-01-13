'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/utils/user';
import { getVerificationTokenByToken } from '@/helper/verification-token';

export const newVerifiedToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date();
  if (hasExpired) {
    return { error: 'Token has expired' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist' };
  }

  await Promise.all([
    db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: true,
        email: existingToken.email,
      },
    }),
    db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    }),
  ]);

  return { success: 'Email has been Verified' };
};
