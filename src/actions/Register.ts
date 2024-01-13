'use server';

import * as z from 'zod';

import { ERROR_MESSAGE } from '@/messages/error';
import { RegisterSchema } from '@/schema';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/token';
import { getUserByEmail } from '@/utils/user';
import { getVerificationTokenByEmail } from '@/helper/verification-token';
import { sendVerificationEmail } from '@/lib/mail';

const URL = process.env.WEB_URL;

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields) {
    return { error: 'Invalid Fields' };
  }
  const { email, password, name } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'Email already Token' };
  }

  try {
    const userData = {
      email,
      password: hashedPassword,
      name,
    };

    await Promise.all([
      db.user.create({ data: userData }),
      generateVerificationToken(email),
    ]);
  } catch (error) {
    console.error(
      `Error while creating user or generating verification token: ${error}`
    );
    return { error: 'Something went wrong' };
  }

  const token = await getVerificationTokenByEmail(email);

  try {
    await sendVerificationEmail(email, token?.token!, URL!);
  } catch (error) {
    console.log(`Error while sending verification email: ${error}`);
    return { error: 'Something went wrong' };
  }

  return { success: 'Verification Email has been Sent' };
};
