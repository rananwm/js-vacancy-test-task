import { z } from 'zod';
import { configUtil } from 'utils';

/**
 * Specify your environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
const schema = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  IS_DEV: z.preprocess(() => process.env.APP_ENV === 'development', z.boolean()),
  PORT: z.coerce.number().optional().default(3001),
  API_URL: z.string(),
  WEB_URL: z.string(),
  MONGO_URI: z.string(),
  MONGO_DB_NAME: z.string(),
  JWT_SECRET: z.string(),
  REDIS_URI: z.string().optional(),
  REDIS_ERRORS_POLICY: z.enum(['throw', 'log']).default('log'),
  ADMIN_KEY: z.string().optional(),
  MIXPANEL_API_KEY: z.string().optional(),
  STRIPE_ENDPOINT_SECRET: z.string(),
  STRIPE_KEY: z.string(),
  STRIPE_SUCCESS_URL: z.string(),
  STRIPE_CANCEL_URL: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_AUTH_DOMAIN: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  FIREBASE_APP_ID: z.string(),
});

type Config = z.infer<typeof schema>;

const config = configUtil.validateConfig<Config>(schema);

export default config;
