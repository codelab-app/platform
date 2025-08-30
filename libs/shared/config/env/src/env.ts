import { from } from 'env-var'

/**
 * https://github.com/evanshortiss/env-var/issues/162
 *
 * `process.env` access must be static and not dynamic, due to how Next.js compiles envs
 */
export const env = from({
  AUTH0_CLIENT_ID: process.env['AUTH0_CLIENT_ID'],
  AUTH0_CLIENT_SECRET: process.env['AUTH0_CLIENT_SECRET'],
  AUTH0_DOMAIN: process.env['AUTH0_DOMAIN'],
  AUTH0_E2E_PASSWORD: process.env['AUTH0_E2E_PASSWORD'],
  AUTH0_E2E_USERNAME: process.env['AUTH0_E2E_USERNAME'],
  AUTH0_M2M_CLIENT_ID: process.env['AUTH0_M2M_CLIENT_ID'],
  AUTH0_M2M_CLIENT_SECRET: process.env['AUTH0_M2M_CLIENT_SECRET'],
  AUTH0_SECRET: process.env['AUTH0_SECRET'],
  AUTH0_SESSION_AUTO_SAVE: process.env['AUTH0_SESSION_AUTO_SAVE'],
  CI: process.env['CI'],
  CIRCLE: process.env['CIRCLE'],
  E2E: process.env['E2E'],
  MAILCHIMP_API_KEY: process.env['MAILCHIMP_API_KEY'],
  MAILCHIMP_LIST_ID: process.env['MAILCHIMP_LIST_ID'],
  MAILCHIMP_SERVER_PREFIX: process.env['MAILCHIMP_SERVER_PREFIX'],
  NEO4J_PASSWORD: process.env['NEO4J_PASSWORD'],
  NEO4J_URI: process.env['NEO4J_URI'],
  NEO4J_USER: process.env['NEO4J_USER'],
  NEXT_PUBLIC_API_HOSTNAME: process.env['NEXT_PUBLIC_API_HOSTNAME'],
  NEXT_PUBLIC_API_PORT: process.env['NEXT_PUBLIC_API_PORT'],
  NEXT_PUBLIC_BASE_API_PATH: process.env['NEXT_PUBLIC_BASE_API_PATH'],
  NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS'],
  NEXT_PUBLIC_HOTJAR_ID: process.env['NEXT_PUBLIC_HOTJAR_ID'],
  NEXT_PUBLIC_HOTJAR_VERSION: process.env['NEXT_PUBLIC_HOTJAR_VERSION'],
  NEXT_PUBLIC_INTERCOM_APP_ID: process.env['NEXT_PUBLIC_INTERCOM_APP_ID'],
  NEXT_PUBLIC_WEB_HOST: process.env['NEXT_PUBLIC_WEB_HOST'],
  NODE_ENV: process.env['NODE_ENV'],
  NEXT_PUBLIC_SUPABASE_KEY: process.env['NEXT_PUBLIC_SUPABASE_KEY'],
  NEXT_PUBLIC_SUPABASE_URL: process.env['NEXT_PUBLIC_SUPABASE_URL'],
})
