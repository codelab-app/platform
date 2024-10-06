// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: true,

  dsn: 'https://ef0fc155d048f83b9ba7fa1455d8a6b5@o4508068702060544.ingest.us.sentry.io/4508068704550912',

  // Add optional integrations for additional features
  integrations: [
    // Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: [
  //   '127.0.0.1',
  //   /^\//,
  //   // /^https:\/\/yourserver\.io\/api/,
  // ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
})
