import { type Context, context } from '@opentelemetry/api'

export const withBoundContext = <T>(activeContext: Context, target: T) =>
  context.bind(activeContext, target)
