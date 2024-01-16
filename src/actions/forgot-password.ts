'use server';

import * as z from 'zod';

import { ResetPasswordSchema } from '@/schema';
import { generateTokenForResetPassport } from '@/lib/token';
import { getUserByEmail } from '@/utils/user';
import { sendVerificationEmailForResetPassword } from '@/lib/mail';

const URL = process.env.WEB_URL;
export const ForgotPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validateFields = ResetPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'email is Missing' };
  }
  const { email } = validateFields.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: 'User is Not Found' };
  }
  const token = await generateTokenForResetPassport(email);
  try {
    await sendVerificationEmailForResetPassword(email, token?.token!, URL!);
    return { success: 'Verification Email has been Sent' };
  } catch (error) {
    console.log(`Error while sending verification email: ${error}`);
    return { error: 'Something went wrong' };
  }
};
