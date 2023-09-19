import { withTracerActiveSpan } from '@codelab/shared/infra/otel'

export const PLATFORM_API_TRACER_NAME = 'platform-api'

export const withActiveSpan = withTracerActiveSpan(PLATFORM_API_TRACER_NAME)
