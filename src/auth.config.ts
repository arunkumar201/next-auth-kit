import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schema';
import { getUserByEmail } from './utils/user';
import bcrypt from 'bcryptjs';
import { getSafeUserDetails } from './helper/user';
import { socialAuthProviders } from './socialProviders';

export default {
  providers: [
    ...socialAuthProviders,
    Credentials({
      async authorize(credential): Promise<unknown | any> {
        const validatedFelids = LoginSchema.safeParse(credential);
        if (!validatedFelids.success) {
          return { error: 'Invalid Fields' };
        }
        const { email, password } = validatedFelids.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          return getSafeUserDetails(user);
        }
        return { message: 'invalid Password' };
      },
    }),
  ],
} satisfies NextAuthConfig;
