import { getUserByEmail, getUserById } from './utils/user';

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import authConfig from './auth.config';
import { db } from './lib/db';
import { getTwoFactorConfirmationByUserId } from './helper/two-factor-confirmataion';
import { getTwoFactorTokenByEmail } from './helper/two-factor-token';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/register',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user?.id,
        },
        data: {
          emailVerified: true,
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user) {
        return false;
      }
      if (account?.provider !== 'credentials') {
        return true;
      }
      //check if user exists and is verified
      const existingUser = await getUserByEmail(user?.email!);

      //if user exists and is not verified,so we prevent sign in
      if (!existingUser || !existingUser?.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) {
          return false;
        }
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    //jwt callback runs before session
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      token.role = existingUser?.role || 'USER';

      return token;
    },
    //after jwt callback ,session callback runs
    async session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
