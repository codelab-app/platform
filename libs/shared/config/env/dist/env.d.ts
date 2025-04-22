/**
 * https://github.com/evanshortiss/env-var/issues/162
 *
 * `process.env` access must be static and not dynamic, due to how Next.js compiles envs
 */
export declare const env: import('env-var').IEnv<import('env-var').IOptionalVariable<import('env-var').Extensions> & import('env-var').ExtenderTypeOptional<import('env-var').Extensions>, {
    AUTH0_CLIENT_ID: string | undefined;
    AUTH0_CLIENT_SECRET: string | undefined;
    AUTH0_DOMAIN: string | undefined;
    AUTH0_E2E_PASSWORD: string | undefined;
    AUTH0_E2E_USERNAME: string | undefined;
    AUTH0_SECRET: string | undefined;
    AUTH0_SESSION_AUTO_SAVE: string | undefined;
    CI: string | undefined;
    CIRCLE: string | undefined;
    E2E: string | undefined;
    MAILCHIMP_API_KEY: string | undefined;
    MAILCHIMP_LIST_ID: string | undefined;
    MAILCHIMP_SERVER_PREFIX: string | undefined;
    NEO4J_PASSWORD: string | undefined;
    NEO4J_URI: string | undefined;
    NEO4J_USER: string | undefined;
    NEXT_PUBLIC_API_HOSTNAME: string | undefined;
    NEXT_PUBLIC_API_PORT: string | undefined;
    NEXT_PUBLIC_BASE_API_PATH: string | undefined;
    NEXT_PUBLIC_GOOGLE_ANALYTICS: string | undefined;
    NEXT_PUBLIC_HOTJAR_ID: string | undefined;
    NEXT_PUBLIC_HOTJAR_VERSION: string | undefined;
    NEXT_PUBLIC_INTERCOM_APP_ID: string | undefined;
    NEXT_PUBLIC_WEB_HOST: string | undefined;
    NODE_ENV: string | undefined;
}>;
