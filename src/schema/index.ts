import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please Enter valid Email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
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
