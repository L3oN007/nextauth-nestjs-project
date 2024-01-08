// @ts-nocheck
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // TODO: Implement email verification

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
      }

      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.access_token = token.access_token;
        session.user.refresh_token = token.refresh_token;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
