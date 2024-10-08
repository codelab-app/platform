// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
// import { nodeProfilingIntegration } from '@sentry/profiling-node'

Sentry.init({
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  dsn: 'https://ef0fc155d048f83b9ba7fa1455d8a6b5@o4508068702060544.ingest.us.sentry.io/4508068704550912',

  integrations: [
    // Add our Profiling integration
    // nodeProfilingIntegration(),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
})
