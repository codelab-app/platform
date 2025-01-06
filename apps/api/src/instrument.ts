import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import env from 'env-var'

/**
 * https://docs.sentry.io/platforms/javascript/guides/nestjs/
 */
Sentry.init({
  dsn: env.get('SENTRY_DSN').asString(),

  /**
   * String are treated as partial match, use regex to match the exact string
   *
   * Transactions are top level, so need to ignore spans at trace level
   */
  ignoreTransactions: [/event server.ready/],

  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // maxValueLength: 10000,

  normalizeDepth: 0,

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,

  /**
   * To enable sampling, either use `tracesSampler` (takes priority) or `tracesSampleRate`.
   */
  tracesSampler: (samplingContext) => {
    const ignoredContext = ['graphql.parse', 'graphql.validate']

    if (ignoredContext.some((context) => samplingContext.name === context)) {
      return 0
    }

    return 1.0
  },
})
