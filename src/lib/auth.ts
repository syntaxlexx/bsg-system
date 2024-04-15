import { userSchema } from "@/data-layer/models/schema";
import UserRepository from "@/data-layer/repositories/user-repository";
import { LoginValidator } from "@/data-layer/validators/auth-validator";
import { AUTH_ERROR } from "@/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { comparePasswords } from "./server-utils";

export const authConfig = {
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        forCheckout: {
          label: "forCheckout",
          type: "hidden",
          value: "false",
        }
      },
      // @ts-ignore: authorize credentials inference is incorrect
      async authorize(credentials) {
        const validatedFields = LoginValidator.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error(`${AUTH_ERROR.MISSING_CREDENTIALS}`);
        }

        const { email, password } = validatedFields.data;

        const results = await db.select().from(userSchema).where(eq(userSchema.email, email)).limit(1)

        if(! results.length) {
          throw new Error(`${AUTH_ERROR.USER_NOT_FOUND}`);
        }

        const user = results[0]

        if (!user?.password) {
          throw new Error(`${AUTH_ERROR.USER_NOT_FOUND}`);
        }

        // check password
        const passwordMatch = await comparePasswords(password, user.password);
        if (!passwordMatch) {
          throw new Error(`${AUTH_ERROR.PASSWORD_ERROR}`);
        }

        return user;
      },
    }),
  ],
  events: {
    // async linkAccount({ user }) {
    //   await db.user.update({
    //     where: {
    //       id: user.id,
    //     },
    //     data: {
    //       emailVerified: new Date(),
    //     },
    //   });
    // },
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // TODO: update user emailVerified at and picture/avatar
        // @ts-ignore: the user contains 'password' column
        const { password, ...userData } = user;

        return {
          ...token,
          ...userData,
        };
      }

      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        // @ts-ignore: session.user jwt should be user
        session.user = token;
      }

      return session;
    },

    signIn: async ({ user, account }) => {
      await UserRepository.recordUserLogin({
        id: user.id!,
        email: user.email,
        name: user.name,
      });

      // allow oauth without email verification
      if (account?.provider !== "credentials") return true;

      // prevent signin without email verification
      // const existingUser = await UserRepository.getById(user.id);
      // if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA

      return true;
    },
  }
} satisfies NextAuthConfig

export const { 
  handlers: { GET, POST }, 
  auth, 
  signIn,
  signOut 
} = NextAuth(authConfig)

/**
 * helper function to get current user in server components
 */
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
