// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
// /* eslint-disable @typescript-eslint/no-var-requires */
const { z } = require("zod");
const { boolean } = require("boolean");

const envSchema = z.object({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  // server
  APP_URL: z.string(),
  TURSO_CONNECTION_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url()
  ),
  // Add ` on ID and SECRET if you want to make sure they're not empty
  // DISCORD_CLIENT_ID: z.string(),
  // DISCORD_CLIENT_SECRET: z.string(),
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_CLIENT_SECRET: z.string(),
  SLACK_ENABLED: z.coerce.boolean().default(false),
  SLACK_WEBHOOK: boolean(process.env.SLACK_ENABLED)
    ? z.string()
    : z.string().optional(),

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  // client
  NEXT_PUBLIC_APP_URL: z.string(),
  NEXT_PUBLIC_APP_NAME: z.string(),
  NEXT_PUBLIC_SOCIALS_LOGIN_ENABLED: z.coerce.boolean().default(false),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG: z.string().optional(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error(
    "❌ Invalid ENV variables: " + JSON.stringify(env.error.format(), null, 4)
  );
}

module.exports.env = env.data;
