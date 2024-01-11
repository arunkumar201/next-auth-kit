import { getUserByEmail, getUserById } from './utils/user';

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import authConfig from './auth.config';
import { db } from './lib/db';

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
    newUser: '/auth/new-user',
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
    async signIn({ user }) {
      if (!user) {
        return false;
      }
      // const existingUser = await getUserByEmail(user?.email!);

      // if (!existingUser || !existingUser?.emailVerified) {
      //   return false;
      // }
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
