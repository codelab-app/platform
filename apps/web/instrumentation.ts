import { initializeWebTraceProvider } from '@codelab/frontend/infra/otel'
import * as Sentry from '@sentry/nextjs'

export const register = async () => {
  // initializeWebTraceProvider()

  if (process.env.NEXT_RUNTIME === 'client') {
    await import('./sentry.client.config')
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

export const onRequestError = Sentry.captureRequestError
