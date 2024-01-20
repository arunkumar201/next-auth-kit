'use server';

import * as z from 'zod';

import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token';
import { send2FATokenEmail, sendVerificationEmail } from '@/lib/mail';

import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { ERROR_MESSAGE } from '@/messages/error';
import { LoginSchema } from '@/schema';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/helper/two-factor-confirmataion';
import { getTwoFactorTokenByEmail } from '@/helper/two-factor-token';
import { getUserByEmail } from '@/utils/user';
import { signIn } from '@/auth';

const URL = process.env.WEB_URL;

export const Login = async (value: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(value);
  if (!validatedFields.success) {
    return { error: 'Invalid Fields' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return { error: 'USER NOT FOUND' };
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return { error: 'Invalid credentials!' };
  }

  if (!existingUser.emailVerified) {
    const token = await generateVerificationToken(existingUser.email);
    try {
      await sendVerificationEmail(email, token?.token!, URL!);
      return { success: 'Verification Email has been Sent' };
    } catch (error) {
      console.log(`Error while sending verification email: ${error}`);
      return { error: 'Something went wrong' };
    }
  }
  if (existingUser?.isTwoFactorEnabled && existingUser?.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: 'Invalid twoFactor Code' };
      }
      if (twoFactorToken.token !== code) {
        return { error: 'Invalid Code' };
      }

      const hasExpired = new Date(twoFactorToken?.expires_at) < new Date();
      if (hasExpired) {
        return { error: 'Code has expired' };
      }
      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken?.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser?.email!);

      if (!twoFactorToken) {
        return { error: 'Invalid twoFactor Code' };
      }
      await send2FATokenEmail(email, twoFactorToken?.token!);
      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    console.log(`Error While Logging In: ${error}`);
    throw error;
  }
  return { success: 'You have Logged Successful' };
};
