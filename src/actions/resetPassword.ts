'use server';

import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

const URL = process.env.WEB_URL;
export const ResetPassword = async (password: string, token: string) => {
  if (!password || !token) {
    return { error: 'Missing Email or Token' };
  }

  // const existingToken
  const user = await db.forgotPasswordToken.findFirst({
    where: {
      token,
    },
  });
  if (!user) {
    return {
      error: 'Invalid Token',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return { success: 'Password has been reset successfully' };
  } catch (error) {
    console.log(`Error while resetting the password: ${error}`);
    return { error: 'Something went wrong' };
  }
};
