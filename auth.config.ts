import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodeToken {
  sub: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          //TODO: RETURN LOGIN USER
          try {
            const response = await axios.post(
              "http://localhost:3333/auth/signin",
              {
                email: email,
                password: password,
              },
            );

            const user = response.data;
            const decodeToken = (await jwt.decode(
              user.access_token,
            )) as DecodeToken;

            return {
              id: decodeToken.sub,
              name: decodeToken.name,
              email: decodeToken.email,
              role: decodeToken.role,
              ...user,
            };
          } catch (error) {
            console.log("LOGIN_ERROR");
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
