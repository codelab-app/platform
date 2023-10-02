import { withTracerActiveSpan } from '@codelab/shared/infra/otel'

export const PLATFORM_TRACER_NAME = 'platform'

export const withActiveSpan = withTracerActiveSpan(PLATFORM_TRACER_NAME)
