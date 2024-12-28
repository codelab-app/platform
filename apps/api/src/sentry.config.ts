import * as Sentry from '@sentry/nestjs'
import env from 'env-var'

Sentry.init({
  dsn: env.get('SENTRY_DSN').asString(),
  integrations: [
    // Add our Profiling integration
    // nodeProfilingIntegration(),
  ],

  normalizeDepth: 0,

  maxValueLength: 10000,

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
