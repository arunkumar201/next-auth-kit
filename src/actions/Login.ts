'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schema';

export const Login = async (value: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields) {
    return { error: 'Invalid Fields' };
  }

  return { success: 'Verification Email has been Sent' };
};
