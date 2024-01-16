import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please Enter valid Email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
  code: z.optional(z.string()),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please Enter valid Email',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Confirm Password should be match with password',
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please Enter valid Email',
  }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .min(8, { message: 'Password must be at least 8 characters' }),
  name: z.string(),
});
