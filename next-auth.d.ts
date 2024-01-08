import { NoInfer } from "@tanstack/react-table";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      access_token: string;
      refresh_token: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    role: string;
    access_token: string;
    refresh_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string;
    role: string;
    access_token: string;
    refresh_token: string;
  }
}
