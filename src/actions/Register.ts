'use server';

import * as z from 'zod';

import { RegisterSchema } from '@/schema';

export const Register = async (value: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields) {
    return { error: 'Invalid Fields' };
  }

  return { success: 'Verification Email has been Sent' };
};
