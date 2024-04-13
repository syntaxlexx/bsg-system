import { AUTH_ERROR } from "@/types";
import type { NextAuthConfig } from "next-auth";
import { db } from "./db";
import { comparePasswords } from "./server-utils";
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from "next-auth/providers/email";
import { LoginValidator } from "@/data-layer/validators/auth-validator";
import CredentialsProvider from "next-auth/providers/credentials";
import { boolean } from "boolean";
import { userSchema } from "@/data-layer/models/schema";
import { eq } from "drizzle-orm";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://authjs.dev/reference/nextjs
 */
export default {
  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID!,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //     allowDangerousEmailAccountLinking: true,
    // }),
    // GitHubProvider({
    //     clientId: process.env.GITHUB_ID,
    //     clientSecret: process.env.GITHUB_SECRET,
    //   }),
    // EmailProvider({
    //     server: {
    //       host: process.env.EMAIL_SERVER_HOST,
    //       port: process.env.EMAIL_SERVER_PORT,
    //       auth: {
    //         user: process.env.EMAIL_SERVER_USER,
    //         pass: process.env.EMAIL_SERVER_PASSWORD,
    //       },
    //     },
    //     from: process.env.EMAIL_FROM,
    //   }),
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
        console.log("credentials", credentials);
        // check if forCheckout is true, log them in without email verification
        if(boolean(credentials.forCheckout)) {
          const results = await db.select().from(userSchema).where(eq(userSchema.email, credentials.email)).limit(1)

          return results.length > 0 ? results[0] : null;
        }
        
        const validatedFields = LoginValidator.safeParse(credentials);

        if (!validatedFields.success) {
          throw new Error(`${AUTH_ERROR.MISSING_CREDENTIALS}`);
        }

        const { email, password } = validatedFields.data;

        const results = await db.select().from(userSchema).where(eq(userSchema.email, credentials.email)).limit(1)

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
  
} satisfies NextAuthConfig
