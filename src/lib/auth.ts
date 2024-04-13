import UserRepository from "@/data-layer/repositories/user-repository";
import { KafkaSubTopics, KafkaTopics } from "@/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./db";
import qstash from "./qstash";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
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

      // send event to kafka for further processing
      await qstash.sendMessageToTopic({
        topic: KafkaTopics.auth,
        subtopic: KafkaSubTopics.login,
        payload: {
          userId: user.id,
          name: user.name,
          email: user.email,
          date: new Date(),
        },
      });

      // allow oauth without email verification
      if (account?.provider !== "credentials") return true;

      // prevent signin without email verification
      // const existingUser = await UserRepository.getById(user.id);
      // if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA

      return true;
    },
  },

  ...authConfig,
});

/**
 * helper function to get current user in server components
 */
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};
