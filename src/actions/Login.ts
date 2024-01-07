'use server';

import * as z from 'zod';

import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { LoginSchema } from '@/schema';
import { getUserByEmail } from '@/utils/user';
import { signIn } from '@/auth';

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
    //should throw error ,otherwise it will not redirect from login page
    throw error;
  }

  return { success: 'Verification Email has been Sent' };
};
