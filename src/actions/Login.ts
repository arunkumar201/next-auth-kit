'use server';

import * as z from 'zod';

import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { ERROR_MESSAGE } from '@/messages/error';
import { LoginSchema } from '@/schema';
import { generateVerificationToken } from '@/lib/token';
import { getUserByEmail } from '@/utils/user';
import { sendVerificationEmail } from '@/lib/mail';
import { signIn } from '@/auth';

const URL = process.env.WEB_URL;

export const Login = async (value: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(value);
  if (!validatedFields.success) {
    return { error: 'Invalid Fields' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return { error: 'USER NOT FOUND' };
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
    return {
      error: `${ERROR_MESSAGE.EMAIL_NOT_VERIFIED} and ${ERROR_MESSAGE.CONFORMATION_MSG}`,
    };
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
